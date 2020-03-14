//******json data*****
var data = [
    { name : "早稲田大学", position : { lat : 35.7091, lng : 139.7222 } },
    { name : "高田馬場駅", position : { lat : 35.7128, lng : 139.7036 } },
    { name : "麺爺あぶら 西早稲田店", position : { lat : 35.70335, lng : 139.7087 }, genre : "aburasoba", capacity : "middle" , price : "low" },
    { name : "台湾まぜそば こころ", position : { lat : 35.71062, lng : 139.70993 }, genre : "mazesoba", capacity : "low" , price : "middle" },
    { name : "台湾まぜそば はなび", position : { lat : 35.703730, lng : 139.707603}, genre : "mazesoba", capacity : "low" , price : "middle" },
//    //{ name : "ラーメン巖鉄", position : { lat : 35.711317, lng : 139.721844 }, genre : "ラーメン", taste : "", price : ""},
    { name : "武道家", position : { lat : 35.706435, lng : 139.720137 }, genre : "ramen", capacity : "low" , price : "middle" },
    { name : "蔭山", position : { lat : 35.711481, lng : 139.709722 }, genre : "ramen", capacity : "low" , price :"high" },
//    //{ name : "らぁ麺 やまぐち", position : { lat : 35.710306, lng : 139.713994 } ,/* taste : "" , price :*/ },
    { name : "油SOBA 図星", position : { lat : 35.707597, lng : 139.719973 } ,genre : "aburasoba", capacity : "low", price : "middle"},
    { name : "図星はなれ", position : { lat : 35.707362, lng : 139.719351 }, genre : "aburasoba", capacity : "high" , price : "middle"  },
//    //{ name : "一条", position : { lat : 35.710363, lng : 139.720838 } , /*taste : "" , price : */},
    { name: "鷹虎", position : { lat : 35.7139, lng : 139.70445 }, genre: "tsukemen", capacity : "low" , price :"high" },
    { name: "麺屋 宋", position : { lat : 35.71109, lng : 139.709664 }, genre : "ramen", capacity: "middle" , price : "middle"},
    { name: "一風堂", position : { lat : 35.710371, lng : 139.712453 }, genre : "ramen", capacity : "middle" , price : "low" },
    { name: "焼麺 劔", position : { lat : 35.713543, lng : 139.708607 }, genre : "ramen", capacity : "low" , price : "high"},
    { name: "俺の空", position : { lat : 35.711395, lng : 139.703001 }, genre : "ramen", capacity : "middle" , price : "high" },
    { name: "違う家", position : { lat : 35.705653, lng : 139.720159 }, genre : "ramen", capacity : "high" , price : "middle"},
    { name: "麺爺あぶら 戸山キャンパス店", position : { lat : 35.706426, lng : 139.718478 }, genre : "aburasoba", capacity : "high" , price : "low"},
    { name: "麺爺あぶら 早稲田店", position : { lat : 35.706647, lng : 139.720610 },genre : "aburasoba", capacity : "high" , price : "low"},
//    //{ name: "渡なべ", position : { lat : 35.711945, lng : 139.709630 }, /*taste : "" , price : */},
//    //{ name: "表裏",  position: { lat : 35.713142, lng : 139.707400 }, /*taste : "" , price :*/ },
    { name: "三歩一", position : { lat : 35.713401, lng : 139.706308 }, genre : "ramen", capacity : "middle" , price : "middle" },
    { name: "蒙古タンメン中本 高田馬場店", position : { lat : 35.712889, lng : 139.705191 }, genre : "ramen", capacity : "middle", price : "high"},
    { name: "武蔵野アブラ学会", position : { lat : 35.711653, lng : 139.719416 },genre : "aburasoba",capacity : "low", price : "low" },
    { name: "東京麺珍亭本舗 西早稲田店", position : { lat : 35.708153, lng : 139.717254 }, taste : "aburasoba", capacity : "low", price : "low"}
//    //{ name: "軽食＆ラーメン メルシー", position : { lat : 35.706533, lng : 139.720546 }, /*taste : "" , price :*/ },
//    //{ name: "鷹流", position : { lat : 35.712840, lng : 139.701320 },/* taste : "" , price :*/ },
//    //{ name: "末廣ラーメン本舗 高田馬場分店", position : { lat : 35.711932, lng : 139.708593 },/* taste : "" , price :*/ }
];
//******json data*****

var map = L.map('map');

var tileLayer = L.tileLayer('https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
{attribution:'© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    maxZoom: 18
});
tileLayer.addTo(map);

var Departure_lat;
var Departure_lng;
var routingControl = null;

map.on('locationfound', onLocationFound); //現在地が取得出来た場合，onLocationFound()を実行
map.on('locationerror', onLocationError); //現在地が取得出来なかった場合，onLocationError()を実行
map.locate({setView: true, maxZoom: 16, timeout: 20000});

function onLocationFound(e) {
    L.marker(e.latlng).addTo(map).bindPopup("現在地").openPopup();
    Departure_lat = e.latlng.lat;
    Departure_lng = e.latlng.lng;
}

function onLocationError(e) {
    alert("Error." + e.message);
}

var matchData = [];

function clickBtn(){
    const tasteSelect = document.form.TasteSelect;
    const priceSelect = document.form.PriceSelect;
    const spaceSelect = document.form.SpaceSelect;
    const activeT = [];
    const activeP = [];
    const activeS = [];
    var j;

    //チェックされているものをそれぞれactiveT,P,Sに格納する
    for (let i = 0; i < tasteSelect.length; i++){
        if(tasteSelect[i].checked){
            activeT.push(tasteSelect[i].value);
        }
    }
    for (let i = 0; i < priceSelect.length; i++){
        if(priceSelect[i].checked){
            activeP.push(priceSelect[i].value);
        }
    }
    for (let i = 0; i < spaceSelect.length; i++){
        if(spaceSelect[i].checked){
            activeS.push(spaceSelect[i].value);
        }
    }

    if(document.switch.sample1on.checked){  //OR
        //一致するものを探す
        matchData = data.filter(function(item, index){
            if(activeT.length === 0){
                if (activeP.indexOf(item.price) >= 0 || activeS.indexOf(item.capacity) >= 0){
                    return true;
                }
            }else if(activeP.length === 0 && activeS.length === 0){
                //ジャンルのみAND検索にした。値段と広さはOR検索
                if (activeT.indexOf(item.genre) >= 0){
                return true;
                }
            }else{
                if( activeT.indexOf(item.genre) >= 0 && (activeP.indexOf(item.price) >= 0 || activeS.indexOf(item.capacity) >= 0)){
                    return true;
                }
            }
        });

    }else if(document.switch.sample1off.checked){  //AND
        //一致するものを探す
        matchData = data.filter(function(item, index){
            if(activeT.length > 0 && activeP.length > 0 && activeS.length >0){
                if (activeT.indexOf(item.genre) >= 0 && activeP.indexOf(item.price) >= 0 && activeS.indexOf(item.capacity) >= 0){
                    return true;
                }
            }else if(activeT.length === 0 && activeP.length > 0 && activeS.length >0){
                if (activeP.indexOf(item.price) >= 0 && activeS.indexOf(item.capacity) >= 0){
                    return true;
                }
            }else if(activeT.length > 0 && activeP.length === 0 && activeS.length >0){
                if (activeT.indexOf(item.genre) >= 0 && activeS.indexOf(item.capacity) >= 0){
                    return true;
                }
            }else if(activeT.length > 0 && activeP.length > 0 && activeS.length === 0){
                if (activeT.indexOf(item.genre) >= 0 && activeP.indexOf(item.price) >= 0){
                    return true;
                }
            }else if(activeT.length > 0 && activeP.length === 0 && activeS.length === 0){
                if (activeT.indexOf(item.genre) >= 0){
                    return true;
                }
            }else if(activeT.length === 0 && activeP.length > 0 && activeS.length === 0){
                if (activeP.indexOf(item.price) >= 0){
                    return true;
                 }
            }else if(activeT.length === 0 && activeP.length === 0 && activeS.length > 0){
                if (activeS.indexOf(item.capacity) >= 0){
                    return true;
                }
            }else{
                if (activeT.indexOf(item.genre) >= 0 && activeP.indexOf(item.price) >= 0 && activeS.indexOf(item.capacity) >= 0){
                    return true;
                }
            }

        });
    }
            //乱数
            j = parseInt(Math.random() * matchData.length);

            if(matchData.length === 0){
                let k = parseInt(Math.random() * 4);
                if(k === 1){
                    alert("見つかりませんでした。");
                }else if(k === 2){
                    alert("貴方自身で新たなお店を開拓してみては？");
                }else if(k === 3){
                    alert("もう少し現実的な検索をしてみませんか。");
                }else if(k === 4){
                    alert("検索条件を変えて実行してください。");
                }
            }

            //前の経路が残っていた場合，削除する
            if (routingControl != null){
                map.removeControl(routingControl);
                routingControl = null;
            }

            alert(matchData[j].name);
            //経路探索
            routingControl = L.Routing.control({
                  waypoints: [
                      L.latLng(Departure_lat, Departure_lng), //現在地
                      L.latLng(matchData[j].position.lat, matchData[j].position.lng) //目的地
                  ],
                  routeWhileDragging: true
              }).addTo(map);
    }

var markerList = [];
function showList(){
    if(markerList.length != 0){
        for(let q = 0; q < markerList.length; q++){
            map.removeLayer(markerList[q]);
        }
    }
    if(matchData.length === 0){
        alert("チェックボックスを入力してください。");
    }else{
        var marker;
        for(let p = 0; p < matchData.length; p++){
            marker = L.marker(matchData[p].position).addTo(map).bindPopup(matchData[p].name).on('click', onMarkerClick);   //onMarkerClickを追加するならここ
            markerList.push(marker);
        }
    }
}

function onMarkerClick(e) {
    if (routingControl != null){
        map.removeControl(routingControl);
        routingControl = null;
    }
    //経路探索
    routingControl = L.Routing.control({
          waypoints: [
              L.latLng(Departure_lat, Departure_lng), //現在地
              L.latLng(e.latlng) //目的地
          ],
          routeWhileDragging: true
      }).addTo(map);

 }

//var data = [
//
//  { name : "早稲田大学", position : { lat : 35.7091, lng : 139.7222 } },
//  { name : "高田馬場駅", position : { lat : 35.7128, lng : 139.7036 } }
//
//];
///*
//var markerList = [
//    { pos: [35.70335, 139.7087], name: "麺爺 西早稲田店" },
//    { pos: [35.71062,139.70993], name: "台湾まぜそば こころ" },
//    { pos: [35.7139, 139.70445], name: "麺屋武蔵 鷹虎" },
//    { pos: [35.71141, 139.70972], name: "蔭山" },
//    { pos: [35.71109, 139.709664], name: "麺屋 宋" },
//    { pos: [35.706229,139.719666], name: "武道家"},
//    { pos: [35.710371,139.712453], name: "一風堂"},
//    { pos: [35.713543,139.708607], name: "焼麺 劔" },
//    { pos: [35.711395, 139.703001], name: "俺の空"},
//    { pos: [35.710180, 139.713986], name: "らぁ麺 やまぐち"},
//    { pos: [35.705653, 139.720159], name: "違う家"},
//    { pos: [35.706426, 139.718478], name: "麺爺あぶら 戸山キャンパス店"},
//    { pos: [35.706647, 139.720610], name: "麺爺あぶら 早稲田店"},
//    { pos: [35.711945, 139.709630], name: "渡なべ"},
//    { pos: [35.711846, 139.709210], name: "やよい軒 馬場口店"},
//    { pos: [35.711932, 139.708593], name: "末廣ラーメン本舗 高田馬場分店"},
//    { pos: [35.713142, 139.707400], name: "表裏"},
//    { pos: [35.713401, 139.706308], name: "三歩一"},
//    { pos: [35.712889, 139.705191], name: "蒙古タンメン中本 高田馬場店"},
//    { pos: [35.711653, 139.719416], name: "武蔵野アブラ学会"},
//    { pos: [35.708153, 139.717254], name: "東京麺珍亭本舗 西早稲田店"},
//    { pos: [35.707413, 139.719751], name: "油SOBA 図星"},
//    { pos: [35.707292, 139.719401], name: "図星 はなれ"},
//    { pos: [35.706533, 139.720546], name: "軽食＆ラーメン メルシー"},
//    { pos: [35.711384, 139.721893], name: "ラーメン巌哲"}
//  ];*/
//
//var map = L.map('map');
////map.setView([35.706, 139.70845], 15);
//
////var pointTogawalab = L.marker([35.706, 139.70845]).addTo(map);
//////    var circle = L.circle([35.706, 139.70845], {
//////        color: 'red',
//////        fillColor: '#f03',
//////        fillOpacity: 0.3,
//////        radius: 50
//////    }).addTo(map);
////pointTogawalab.bindPopup("戸川研究室").openPopup();
////
////    map.on('click', onMapClick);
//////    map.on('click', onMapClick2);
////
////     //mousemoveイベントを設定
////    map.on('mousemove', onMapMousemove)
////     //左上にdivコントロールを表示
////     var latloninfo = L.control({ position: "topleft" });
////     latloninfo.onAdd = function (map) {
////       //divを作成
////       this.ele = L.DomUtil.create('div', "infostyle");
////       //後で使うためにidを設定
////       this.ele.id = "latlondiv";
////       //最初は非表示
////       this.ele.style.visibility = "hidden";
////       //div上のとmousemoveイベントがmapに連鎖しないように設定
////       this.ele.onmousemove = function (e) { e.stopPropagation() };
////       return this.ele;
////    };
////    latloninfo.addTo(map);
//
//    /*//マーカー全体が入るボックスを作る
//    var bound = L.latLngBounds(markerList[0].pos, markerList[0].pos);
//    //markerListの設定でマーカーを追加
//    for (var num in markerList) {
//      var mk = markerList[num];
//      var popup = L.popup().setContent(mk.name);
//      L.marker(mk.pos, { title: mk.name }).bindPopup(popup).addTo(map);
//      //マーカー全体が入るボックスを広げる
//      bound.extend(mk.pos);
//    }*/
//
//    var tileLayer = L.tileLayer('https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
//    {attribution:'© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
//        maxZoom: 18
//    });
//    tileLayer.addTo(map);
//
//  map.on('locationfound', onLocationFound); //現在地が取得出来た場合，onLocationFound()を実行
//  map.on('locationerror', onLocationError); //現在地が取得出来なかった場合，onLocationError()を実行
//
//  map.locate({setView: true, maxZoom: 16, timeout: 20000});
//
//function onLocationFound(e) {
//    L.marker(e.latlng).addTo(map).bindPopup("現在地").openPopup();
//    var Departure_lat = e.latlng.lat;
//    var Departure_lng = e.latlng.lng;
//
//    //目的地の入力
//    goal = window.prompt("目的地を入力してください！", "");
//    //一致するものを探す
//    var matchData = data.filter(function(item, index){
//      if (item.name == goal) return true;
//    });
//
//   //経路探索
//    L.Routing.control({
//          waypoints: [
//              L.latLng(Departure_lat, Departure_lng), //現在地
//              L.latLng(matchData[0].position.lat,matchData[0].position.lng);
//              //L.latLng(35.304, 139.779);
//          ],
//          routeWhileDragging: true
//      }).addTo(map);
//}
//
//function onLocationError(e) {
//    alert("Error." + e.message);
//}
//
////var popup = L.popup();
////
////function onMapClick(e) {
////    //地図のclickイベント呼び出される
////    //クリック地点の座標にマーカーを追加、マーカーのclickイベントでonMarkerClick関数を呼び出し
////    var mk = L.marker(e.latlng).on('click', onMarkerClick).addTo(map);
////  }
////
////function onMarkerClick(e) {
//// //マーカーのclickイベント呼び出される
//// //クリックされたマーカーを地図のレイヤから削除する
//// map.removeLayer(e.target);
//// }
////
////  function onMapMousemove(e) {
////    //地図上を移動した際にdiv中に緯度経度を表示
////    var box = document.getElementById("latlondiv");
////    var html = "緯度:" + e.latlng.lat.toFixed(6) + "<br>" +
////      "経度:" + e.latlng.lng.toFixed(6);
////    box.innerHTML = html;
////    box.style.visibility = "visible";
////  }}
