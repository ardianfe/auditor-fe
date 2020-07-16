/* eslint-disable no-console */
/* eslint-disable no-alert */

import Router from './Router.js';


const router = new Router({
  mode: 'hash',
  root: '/'
});

router
  .add(/about/, () => {
    alert('welcome in about page');
  })
  .add(/personel\/(.*)/, (id) => {
    // alert(`personel: ${id}`);
    fetch(`http://127.0.0.1:8080/api/personnel/${id}/`)
      .then((resp) => resp.json())
      .then(function(data){
        let details = data.result;
        let detail = details.filter(function(item) {
          return item.nama_personel;
        })
        let name = detail[0].nama_personel;
        let status = detail[0].status ;
        let detailHeader = document.querySelector('div');
        detailHeader.classList.add("personnel-header");
        let divHead = `<div class="head-name"><h1>${name}</h1></div>
                         <div class="head-status">Status: ${status}</div>`;
        // let divHead = `<div class="head-name"><h1>${name}</h1></div>
        //                  <div class="head-status">Status: ${status}</div>
        //                  <div class=update-button>
        //                     <button id="updBtn">update</button>
        //                   </div>`;
        detailHeader.innerHTML = divHead ;


        let status9001 = detail[0].status9001;
        let status14001 = detail[0].status14001;
        let statusKomp = new Array(status9001,status14001);
        console.log(statusKomp[1])

        // create <main>
        const detailMain = document.createElement("main");
        document.querySelector("body").appendChild(detailMain);

        // create <table>
        let table = createTable(detailMain)
        let tableHeadCont = `<th>Kompetensi</th>
                    <th>Lead Auditor</th>
                    <th>Auditor</th>
                    <th>Calon Auditor</th>`;
        createTableHead(table, tableHeadCont);
        let kompKeys = new Array ('iso 9001', 'iso 14001');
        console.log(kompKeys);
        for (let i = 0; i < kompKeys.length-1; i++) {
          for (let i = 0; i < statusKomp.length; i++) {
            let row = `<tr>
                      <td>${kompKeys[i]}</td>
                      <td></td>
                      <td></td>
                      <td></td>
                  </tr>`
        table.innerHTML += row;
          }
        }

        let tdElement = document.getElementById("tableKomp");
        // if (statusKomp[0] === "LA") {
        //   tdElement.rows[1].cells[1].innerHTML = `<i class="fas fa-check-circle"></i>`;
        // }
        // if (statusKomp[0] === "A") {
        //   tdElement.rows[1].cells[2].innerHTML = `<i class="fas fa-check-circle"></i>`;
        // }
        // if (statusKomp[0] === "CA") {
        //   tdElement.rows[1].cells[3].innerHTML = `<i class="fas fa-check-circle"></i>`;
        // }
        // if (statusKomp[1] === "LA") {
        //   tdElement.rows[2].cells[1].innerHTML = `<i class="fas fa-check-circle"></i>`;
        // }
        // if (statusKomp[1] === "A") {
        //   tdElement.rows[2].cells[2].innerHTML = `<i class="fas fa-check-circle"></i>`;
        // }
        // if (statusKomp[1] === "CA") {
        //   tdElement.rows[2].cells[3].innerHTML = `<i class="fas fa-check-circle"></i>`;
        // }

        for (let i = 0; i < 3; i++) {
          if (statusKomp[i] === "LA") {
            tdElement.rows[i+1].cells[1].innerHTML = `<i class="fas fa-check-circle"></i>`;
          }
          if (statusKomp[i] === "A") {
            tdElement.rows[i+1].cells[2].innerHTML = `<i class="fas fa-check-circle"></i>`;
          }
          if (statusKomp[i] === "CA") {
            tdElement.rows[i+1].cells[3].innerHTML = `<i class="fas fa-check-circle"></i>`;
          }
        }
 
       
        
        // let btn = document.getElementById("updBtn");
        // console.log(btn)
        // btn.addEventListener("click", updateData);
        // function updateData () {
        //   let statusKomp9001 = detailKomp.iso90001;
        //   let statusKomp14001 = detailKomp.iso14000;
        //   status9001(statusKomp9001, statusKomp14001, id)  
        // }
        

        

        // Sektor
        let komp = details.filter(function(item){
          return item.kompetensi;
      })
        let detailKomp = komp[0].kompetensi;
        const divSektor = document.createElement('div');
        divSektor.classList.add("detail-sektor");
        detailMain.appendChild(divSektor);
        divSektor.innerHTML = "<div><h3>Sektor<h3>";
        
        const divSektorContent = document.createElement('div')
        divSektorContent.classList.add("sektor-content");
        divSektor.appendChild(divSektorContent);
        let sektorKomp = detailKomp.iso90001.sektor;
        let resultKomp = getKeyByValue(sektorKomp, 1);
        let arrayResult = new Array();
        for (let i = 0; i < resultKomp.length; i++) {
          arrayResult.push(itemSektor(resultKomp[i]));
        }

        // console.log(arrayResult);
        for(let i = 0; i < arrayResult.length; i++) {
          let li = `<ul>
                        <li>${arrayResult[i]}</li>
                    <ul>`
          divSektorContent.innerHTML += li             
        }

      })
      .catch(function(error) {
          console.log(error);
      });
  })
  .add('', () => {
    // general controller
    console.log('welcome in catch all controller');
  });

  // Create table
  function createTable (detailMain) {
    let table = document.createElement("table");
    table.classList.add("w3-table","w3-striped", "w3-hoverable")
    table.setAttribute("id", "tableKomp");
    detailMain.appendChild(table);
    return table;
  }

  function createTableHead (table, tableHeadCont) {
    let tableRow = document.createElement("tr");
    tableRow.classList.add("bg-info");
    table.appendChild(tableRow);
    tableRow.innerHTML = tableHeadCont;
  }


  // Fungsi to get value sektor = 1
  function getKeyByValue(object, value) {
    return Object.keys(object).filter(key => object[key] === value);
  }

  function itemSektor (resultKomp) {
      switch (resultKomp) {
        case "12" :
          return "[12] Chemical, chemical products and fibres";
          break;
        case "14" :
           return "[14] Rubber and plastic products";
          break;
        case "16" :
           return "[16] Concrete, cement, lime, plaster";
        break;
        case "17" :
          return "[17] Basic metals and fabricated metal products";
        break;
        case "18" :
          return "[18] Machinery and equipment";
          break;
        case "19" :
           return "[19] Electrical and optical equipment";
          break;
        case "22" :
           return "[22] Other transport equipment";
        break;
        case "28" :
          return "[28] Construction";
        break;
        case "29" :
          return "[29] Wholesale and retail trade; Repair of motor vehicles, motorcycles dan personal";
          break;
        case "33" :
           return "[33] Information Technology";
          break;
        case "34" :
           return "[34] Engineering services";
        break;
        case "35" :
          return "[35] other services";
        break;
        case "36" :
          return "[36] public administration";
        break;
        default:
          return "Tidak Punya keahlian";


      }
    
  }

  // function status9001(statusKomp9001, statusKomp14001, id) {
  //   let jsonData = new Object();
  //   if (statusKomp9001.lead_auditor.status === 1){
  //     jsonData["status9001"] = "LA";
  //   } else if (statusKomp9001.auditor.status === 1){
  //     jsonData["status9001"] = "A";
  //   } else if (statusKomp9001.calon_auditor.status === 1) {
  //     jsonData["status9001"] = "CA";
  //   }
  //   if (statusKomp14001.lead_auditor.status === 1) {
  //     jsonData["status14001"] = "LA";
  //   } else if (statusKomp14001.auditor.status === 1) {
  //     jsonData["status14001"] = "A";
  //   } else if (statusKomp14001.calon_auditor.status === 1) {
  //     jsonData["status14001"] = "CA";
  //   } else "no status";

  //   fetch(`http://127.0.0.1:8080/api/personnel/${id}/`,{
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(jsonData), 
  //   })
  //   .then(response => response.json())
  //   .then(data => {
  //     console.log('Succes', data);
  //   })
  //   .catch((error) => {
  //   console.error('Error: ',error);
  //   })
  // }

  
  
  

  


