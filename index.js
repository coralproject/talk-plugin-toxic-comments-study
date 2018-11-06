const debug = require('debug')('talk:plugin:toxic-comments-study');
const fetch = require('node-fetch');

// Load the global Talk configuration, we want to grab some variables..
const { ROOT_URL } = require('config');

// Use the ROOT_URL to grab the domain to construct a communityID for the
// feedback.
const communityId = `Coral:${new URL(ROOT_URL).domain}`;

const statusMap = {
  ACCEPTED: 'APPROVED',
  REJECTED: 'DELETED',
  FEATURED: 'HIGHLIGHTED',
};

const submitCommentScoreFeedback = (
  {
    id: Coral_comment_id, // Comment ID.
    parent_id: reply_to_id_Coral_comment_id, // Comment parent id (reply parent).
    body: comment, // Comment body.
  }, // Comment.
  {
    url, // Asset (article) URL.
  }, // Asset (article).
  status // Mapped from the `statusMap` above.
) =>
  // Handle this operation in the next tick, so it does not affect the current
  // comment processing.
  process.nextTick(async () => {
    // Construct a client token.
    const clientToken = `comment:${Coral_comment_id}`;

    // Construct the study payload.
    const payload = {
      comment: {
        text: comment,
      },
      context: {
        entries: [
          {
            text: JSON.stringify({
              url,
              reply_to_id_Coral_comment_id,
              Coral_comment_id,
            }),
          },
        ],
      },
      attributeScores: {
        [status]: {
          summaryScore: {
            value: 1,
          },
        },
      },
      languages: ['EN'],
      communityId,
      clientToken,
    };

    try {
      // Send the feedback to perspective.
      const res = await fetch(
        `https://commentanalyzer.googleapis.com/v1alpha1/comments:suggestscore?key=${
          process.env.TALK_PERSPECTIVE_API_KEY
        }`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload, null, 2),
        }
      );

      // Verify that we got the same clientToken back from the response.
      const body = await res.json();
      if (!body || body.clientToken !== clientToken) {
        throw new Error(
          `"${JSON.stringify(
            body
          )}" did not contain the clientToken we expected`
        );
      }

      debug(`sent ${status} feedback to perspective`);
    } catch (err) {
      console.error(`could not send ${status} feedback to perspective`, err);
    }
  });

module.exports = {
  hooks: {
    RootMutation: {
      // Hook into mutations associated with accepting/rejecting comments.
      setCommentStatus: {
        async post(root, args, ctx) {
          if (ctx.user && args.status in statusMap) {
            const comment = await ctx.loaders.Comments.get.load(args.id);
            if (comment) {
              const asset = await ctx.loaders.Assets.getByID.load(
                comment.asset_id
              );

              // Submit feedback.
              submitCommentScoreFeedback(
                comment,
                asset,
                statusMap[args.status]
              );
            }
          }
        },
      },
      // Hook into mutations associated with featuring comments.
      addTag: {
        async post(root, args, ctx) {
          if (
            ctx.user &&
            args.tag.name === 'FEATURED' &&
            args.tag.item_type === 'COMMENTS'
          ) {
            const comment = await ctx.loaders.Comments.get.load(args.tag.id);
            if (comment) {
              const asset = await ctx.loaders.Assets.getByID.load(
                comment.asset_id
              );

              // Submit feedback.
              submitCommentScoreFeedback(
                comment,
                asset,
                statusMap[args.tag.name]
              );
            }
          }
        },
      },
    },
  },
};
