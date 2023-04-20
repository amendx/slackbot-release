import * as core from '@actions/core'
import * as github from '@actions/github'
import type {ReleaseReleasedEvent} from '@octokit/webhooks-types'
import {notifyChangelog} from './changelog-notification'

async function run(): Promise<void> {
  try {
    core.debug(`Sending notification...`)
    const title: string = core.getInput('title')
    const slackWebhookUrl: string = core.getInput('slack_webhook_url')

    const context = github.context
    const {eventName, repo} = context
    if (eventName !== 'release') {
      core.setFailed('Action should only be run on release publish events')
    }
    const payload = context.payload as ReleaseReleasedEvent
    await notifyChangelog({
      title,
      slackWebhookUrl,
      release: payload.release,
      repo
    })

    core.debug('Sent notification')
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
