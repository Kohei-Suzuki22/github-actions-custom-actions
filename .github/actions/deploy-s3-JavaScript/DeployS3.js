// JS上で、アクションを効率的に開発するために提供されているパッケージ -> https://github.com/actions/toolkit

const core = require('@actions/core')
const github = require('@actions/github')
const exec = require('@actions/exec')

function run() {

  // 1)inputを取得する。
  // // action.ymlのinput名と、オプション(require）の指定と合わせた形にする。
  // // core.getInput('入力パラメータ名', { オプションkey: オプションvalue })
  const bucket = core.getInput('bucket', { required: true });
  // // action.ymlの方では、required: falseで設定されていたが、trueで設定しても問題ない。
  const bucketRegion = core.getInput('bucket-region', { required: true });
  const distFolder = core.getInput('dist-folder', { required: true });

  // 2)ファイルのアップロード。
  // // exec.exec('シェルスクリプト')　: 指定したシェルスクリプトを実行してくれる.　例: exec.exec('echo "Hello"')
  const s3Uri = `s3://${bucket}`
  // // ※ ubuntu-latestで実行する場合は、最初からawsCLIコマンドが使えるようになっている。
  // // aws s3 sync <ローカルフォルダー> <s3フォルダー>　: ローカルのフォルダーをs3にコピーできる。
  exec.exec(`aws s3 sync ${distFolder} ${s3Uri} --region ${bucketRegion}`)


  const websiteUrl = `http://${bucket}.s3-website-${bucketRegion}.amazonaws.com`
  // 3)静的ホスティングのurlをアウトプットに指定。
  // // core.setOutput(<action.ymlで記載したoutputsの対象のキー名>, <値>)
  core.setOutput('website-url', websiteUrl)   // echo 'website-url=websiteUrl' >> $GITHUB_OUTPUTと同じ。

  // アクションズのワークフローにログ出力する。
  core.notice('Hello from my custom JavaScript Action!')

}


run();