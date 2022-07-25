# Notify Slack on Release

Essa Github Action permite que você envie notificações em *rich text* para seus canais do Slack quando uma modificação for feita em seu repositório.

Para essa ação ser realizada, dependemos do [mack](https://github.com/instantish/mack) para renderizar o corpo da nossa release como mensagens do Slack.

<img width="782" alt="Design Master" src="https://user-images.githubusercontent.com/30783877/180804836-f2644f6f-ff79-4dd1-b3c9-04f6a56f91c1.png">

# Utilização
## Instruções

- [Create a Slack app](https://api.slack.com/apps/new) called "Release Bot"
- Clique **Incoming Webhooks** e selecione **Activate Incoming Webhooks**
- Clique **Add New Webhook to Workspace**
- Escolha o canal que o app irá ter permissão e clique em **Authorize**
- Defina seu `SLACK_WEBHOOK_URL` à sessão Webhook URL
- Crie um arquivo de workflow, como no exemplo:

```yaml
name: Notificar Slack on Changelogs

on:
  release:
    types:
      - created

jobs:
  notify_slack:
    runs-on: ubuntu-latest
    name: Notify Slack on Changelogs
    steps:
      - name: Notify Slack on Release
        uses: amendx/slackbot-release@1.0.0
        with:
          slack_webhook_url: ${{ secrets.SLACK_WEBHOOK_URL }}
```

<img width="973" alt="Screen Shot 2022-04-06 at 4 55 22 PM" src="https://user-images.githubusercontent.com/1459660/162070525-9fe28500-942a-4158-bd5c-3ebaebb28b0d.png">

## Walkthrough video

[![Walkthrough](https://fabric-slack.s3.us-east-2.amazonaws.com/TJ5G67VHU/31fae90afecb2cf0022459532438b759-screen_shot_2022-04-08_at_12.21.08_pm.png)](https://www.youtube.com/watch?v=RKfsnp_AN-4&t=12s)



# Contributing

## Developing locally

Install the dependencies

```bash
$ npm install
```

Build the typescript and package it for distribution

```bash
$ npm run build && npm run package
```

Run the tests :heavy_check_mark:

```bash
$ npm test
...
```

## Releasing

Cut a new release

```bash
$ release-it
```
