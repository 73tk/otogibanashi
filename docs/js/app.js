(function () {
  var commentArr = [];

  var speakerAddPanel = new Vue({
    el: '#speaker-add-panel',
    data: {
      isPanelShow: false
    }
  });

  var speakerAddPanelShowBtn = new Vue({
    el: '#speaker-add-show-btn',
    methods: {
      showSpeakerAddPanel: function () {
        speakerAddPanel.isPanelShow = !speakerAddPanel.isPanelShow;
      }
    }
  });

  var screenShotBtn = new Vue({
    el: '#screen-shot-btn',
    methods: {
      screenShot: function () {
        screenshotHtml();
      }
    }
  });

  var dlBtn = new Vue({
    el: '#dl-btn',
    methods: {
      downloadImage: function () {
        downloadImage(canvasData);
      }
    }
  });

  var speakerList = new Vue({
    el: '#speaker-list',
    data: {
      items: [
        {
          isMe: true,
          name: 'takuma',
          icon: ''
        },
        {
          isMe: false,
          name: 'jirou',
          icon: ''
        }
      ]
    }
  });

  var IconUploader = document.getElementById('new-speaker-icon');
  var result = document.getElementById('result');

  function loadLocalImage(e) {
    // ファイル情報を取得
    var fileData = e.target.files[0];
    // 画像ファイル以外は処理を止める
    if(!fileData.type.match('image.*')) {
      alert('画像を選択してください');
      return;
    }
    // FileReaderオブジェクトを使ってファイル読み込み
    var reader = new FileReader();
    // ファイル読み込みに成功したときの処理
    reader.onload = function() {
      // ブラウザ上に画像を表示する
      var img = document.createElement('img');
      img.src = reader.result;
      result.appendChild(img);
      commentArr.push(img);
      console.log(reader.result)
    }
    // ファイル読み込みを実行
    reader.readAsDataURL(fileData);
  }

  // ファイルが指定された時にloadLocalImage()を実行
  IconUploader.addEventListener('change', loadLocalImage, false);

  var canvasData = null;
  var target = document.getElementById('speaker-list');
  var btn = document.getElementById('screen-shot-btn');
  var dlBtn = document.getElementById('dl-btn');
  // html2canvas実行

  function createElem () {
    var element = document.createElement('div');
    element.id = 'id';
    element.innerHTML = 'hogehoge';
    element.style.backgroundColor = 'red';
    target.appendChild(element);
  }

  function screenshotHtml(){
    createElem ();
    html2canvas(target).then(function(canvas){
      document.body.appendChild(canvas);
      canvasData = canvas;
    }).catch(function(err){
      alert(err);
    });
  }

  // 画像のダウンロード
  function downloadImage(canvas) {
    var dataUrl = canvasData.toDataURL('image/png');   // PNG形式
    var event = document.createEvent('MouseEvents');
    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    var a = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
    a.href = dataUrl;
    a.download = '出力ファイル名';
    a.dispatchEvent(event);
  }

})();