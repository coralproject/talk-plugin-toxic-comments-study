# talk-plugin-toxic-comments-study

This is a plugin that works with the existing [Talk](https://github.com/coralproject/talk) [Toxic Comments plugin](https://docs.coralproject.net/talk/toxic-comments/). It sends anonymous comment data back to Google Jigsaw, in order to improve their AI data models. This is the plugin to activate, as well as the Toxic Comments plugin, if you are taking part in their Participation Challenge. [Click here to read more about that and to apply.](https://docs.google.com/forms/d/e/1FAIpQLSdl9jsE2qNkVrCiShqy0FPdoGdZwEU5Kf8BjT5z1vO0Ms0WMQ/viewform)

## Installation

Modify/create your plugins.json file to include the plugin:

```
{
  "server": [
    // ...
    {"@coralproject/talk-plugin-toxic-comments-study": "^0.0.1"},
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