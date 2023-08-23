import type {Block, DividerBlock, HeaderBlock, SectionBlock} from '@slack/types'
import type {OauthV2AccessResponse} from '@slack/web-api/dist/response'
import axios from 'axios'
import {markdownToBlocks} from '@instantish/mack'

interface Repository {
  repo: string
  owner: string
}

interface Release {
  html_url: string
  name: string
  body: string
}

interface ChangelogParameters {
  title: string
  slackWebhookUrl: string
  release: Release
  repo: Repository
}

export async function notifyChangelog({
  title,
  slackWebhookUrl,
  release,
  repo
}: ChangelogParameters): Promise<OauthV2AccessResponse> {
  const introBlock: HeaderBlock = {
    type: 'header',
    text: {
      type: 'plain_text',
      text: `🎉 [${title}]: ${release.name}`
    }
  }
  const linkBlock: SectionBlock = {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: `<${release.html_url}>`
    }
  }
  const dividerBlock: DividerBlock = {type: 'divider'}

  const bodyBlocks: Block[] = await markdownToBlocks(release.body)

  return await axios.post(slackWebhookUrl, {
    text: `${release.name} has been released in ${repo.owner}/${repo.repo}`,
    blocks: [introBlock, linkBlock, dividerBlock, ...bodyBlocks]
  })
}
