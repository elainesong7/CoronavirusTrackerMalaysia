window.onload = function(){
  getCovidStats();
}

function getCovidStats(){

    var xmlhttp = new XMLHttpRequest();
    var url = "https://api.apify.com/v2/key-value-stores/6t65lJVfs3d8s6aKc/records/LATEST?disableRedirect=true";
    xmlhttp.open("GET", url , true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var myObj = JSON.parse(this.responseText);

            document.getElementById("cases").innerHTML =  myObj.testedPositive;
            document.getElementById("recovered").innerHTML = myObj.recovered;
            document.getElementById("active").innerHTML = myObj.activeCases;
            document.getElementById("death").innerHTML = myObj.deceased;

            var latestUpdate_date = myObj.lastUpdatedAtApify;
            document.getElementById("date").innerHTML = latestUpdate_date.substring(0,10);

            recoveryRate(myObj.recovered, myObj.testedPositive);
            fatalRate(myObj.deceased, myObj.testedPositive);

          }
      }
}

// Calculate latest Recovery rate
function recoveryRate(recovered, cases){

  let recoverNum = (recovered/cases)*100;
  let non_recoverNum = ((cases-recovered)/cases) * 100
  // create data
  var data = [
    {x: "Recovered", value: recoverNum},
    {x: "Non-recover", value: non_recoverNum},
  ];

  chart = anychart.pie(data);
  chart.title("Recovery Rate");
  chart.innerRadius("80%");

  chart.container("container");
  chart.draw();

  var label = anychart.standalones.label();
  label.text(recoverNum.toFixed(2) +" OF TOTAL CASES");
  label.width("100%");
  label.height("100%");
  label.fontColor("#60727b");
  label.hAlign("center");
  label.vAlign("middle");

  chart.center().content(label);
}

// Calculate latest Fatality rate
function fatalRate(deceased, cases){

  let fatalNum = (deceased/cases)*100;
  let non_fatalNum = ((cases-deceased)/cases) * 100
  // create data
  var data = [
    {x: "Fatal", value: fatalNum},
    {x: "Non-fatal", value: non_fatalNum},
  ];

  chart = anychart.pie(data);
  chart.title("Fatality Rate");
  chart.innerRadius("80%");

  chart.container("container2");
  chart.draw();

  var label = anychart.standalones.label();
  label.text(fatalNum.toFixed(2) +" OF TOTAL CASES");
  label.width("100%");
  label.height("100%");
  label.fontColor("#60727b");
  label.hAlign("center");
  label.vAlign("middle");

  chart.center().content(label);
}
