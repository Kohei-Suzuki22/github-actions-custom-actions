// JS上で、アクションを効率的に開発するために提供されているパッケージ -> https://github.com/actions/toolkit

const core = require('@actions/core')
const github = require('@actions/github')
const exec = require('@actions/exec')

function run() {
  // アクションズのワークフローにログ出力する。
  core.notice('Hello from my custom JavaScript Action!')

}


run();