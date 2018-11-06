# talk-plugin-toxic-comments-study

[![npm version](https://badge.fury.io/js/%40coralproject%2Ftalk-plugin-toxic-comments-study.svg)](https://badge.fury.io/js/%40coralproject%2Ftalk-plugin-toxic-comments-study)

This is a plugin for [Talk](https://github.com/coralproject/talk) that can be used instead of the existing [talk-plugin-toxic-comments](https://docs.coralproject.net/talk/plugin/talk-plugin-toxic-comments/) plugin. It sends anonymous comment data back to Google Jigsaw, in order to improve their AI data models. This is the less integrated plugin to activate if you are taking part in their Participation Challenge. You can additionally instead set `TALK_PERSPECTIVE_SEND_FEEDBACK=TRUE` in your environment with the [talk-plugin-toxic-comments](https://docs.coralproject.net/talk/plugin/talk-plugin-toxic-comments/) plugin enabled. Note that you will need at least Talk v4.6.6 in order to use this environment.

[Click here to read more about that and to apply.](https://docs.google.com/forms/d/e/1FAIpQLSdl9jsE2qNkVrCiShqy0FPdoGdZwEU5Kf8BjT5z1vO0Ms0WMQ/viewform)

## Installation

Modify/create your plugins.json file to include the plugin:

```
{
  "server": [
    // ...
    {"@coralproject/talk-plugin-toxic-comments-study": "^0.0.5"},
    // ...
  ],
  "client": [
    // ...
  ]
}
```

Which will enable it.

## Configuration:

- `TALK_PERSPECTIVE_API_KEY` (**required**) - The API Key for Perspective. You
  can register and get your own key at [http://perspectiveapi.com/](http://perspectiveapi.com/).

## License

Talk is released under the Apache License, v2.0.
