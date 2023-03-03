
const showAllBtn = document.getElementById("see-all");
const apiContainer = document.getElementById('api-container');
const spinner = document.getElementById('spinner');
const sortByDate = document.getElementById('sort-by-date');

const loadAi = (limit, shouldSort = false) =>{
    spinner.classList.remove("d-none");
    fetch('https://openapi.programming-hero.com/api/ai/tools')
    .then(res => res.json())
    .then(data => {
        if(!shouldSort){
            displayAi(data.data.tools, limit)
        }else{
            data.data.tools.sort((a, b) => {
                const dateA = new Date(a.published_in);
                const dateB = new Date(b.published_in);
                return dateB - dateA;
              });              
            displayAi(data.data.tools, limit)
        }
    })
}
const displayAi = (data, limit)=>{

    if(limit === 12){
        showAllBtn.classList.add("d-none")    }

    data.slice(0, limit).forEach(singleApi =>{
         console.log(singleApi)

    // apiContainer.innerHTML = '';
    // display all card 
    const aiDiv = document.createElement('div')
    aiDiv.classList.add('col')
    aiDiv.innerHTML = `
    <div class="card h-100">
      <img src="${singleApi.image}" class="card-img-top" alt="...">
        <div class="card-body">
                    <h5 class="card-title font-bold">Feature</h5>
                    <div class="">
                    <ol>
                    <li>${singleApi.features[0]}</li>
                    <li>${singleApi.features[1]}</li>
                    <li>${singleApi.features[2]}</li>
                    </ol>
                    </div>
                    <hr/>
        <div class="d-flex justify-content-between align-items-center">
            <div>
            <h5>${singleApi.name}</h5>

            <p><i class="fa-solid fa-calendar-days"></i> ${new Date(singleApi.published_in).toDateString()}</p>
            </div>
            <i class="fa-solid fa-circle-info fa-xl" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="modalDetails('${singleApi.id}')"></i>
        </div>


        </div>
  </div>
    
    `;
    // appendChild
    apiContainer.appendChild(aiDiv);
        })
        spinner.classList.add("d-none");
}

// const seeAllDetails = (dataLimit)=>{
//     // console.log(dataLimit)
//     loadAi(dataLimit)
// }
document.getElementById('see-all-btn').addEventListener('click', function(){
   

})

const modalDetails = (id) =>{
    const URL = `https://openapi.programming-hero.com/api/ai/tool/${id}`
    fetch(URL)
    .then(res => res.json())
    .then(data => DisplayModalDetails(data.data))
}
const DisplayModalDetails = (modal)=>{
    console.log('hello', modal)
    const modalContainer = document.getElementById('modal-details')
    modalContainer.innerHTML = '';
    const modalDiv = document.createElement('div')
    modalDiv.classList.add('d-md-flex','gap-md-3', 'md-p-5')

    var acc;
    if(modal?.accuracy?.score){
        acc = `<button class="position-absolute btn btn-danger "> 
            <span>${modal?.accuracy?.score*100}</span>% accuracy</span>
         </button>`
    }else{
        acc = ""  
    }

    modalDiv.innerHTML = `
    
        <div class="border border-danger p-4 bg-warning-subtle rounded ">
            <div>
                <h4>${modal.description}</h4>
            </div>
           
            <div class="d-flex justify-content-around md-my-3 md-gap-4">

                <div class="text-success bg-light-subtle md-p-4 md-w-25 rounded ">
                    <h5 >${modal?.pricing ? modal?.pricing?.[0]?.price : ""}</h5>
                    <h5>${modal?.pricing ? modal?.pricing?.[0]?.plan : "Free of cost/Basic"}</h5>
                </div>

                <div class="text-warning bg-light-subtle md-p-4 rounded">
                <h5 >${modal?.pricing ? modal?.pricing?.[1]?.price : ""}</h5>
                    <h5>${modal?.pricing ? modal?.pricing?.[1]?.plan : "Free of cost/Pro"}</h5>
                </div>

                <div class="text-danger bg-light-subtle md-p-4 rounded">
                <h5 >${modal?.pricing ? modal?.pricing?.[2]?.price : ""}</h5>
                <h5>${modal?.pricing ? modal?.pricing?.[2]?.plan : "Free of cost/Enterprise"}</h5>
                </div>
            </div>

            <div class="d-flex justify-content-around">
                <div>
                    <h3>Features</h3>
                    <ul class=" text-light-emphasis">
                        <li>${modal.features[1].feature_name}</li>
                        <li>${modal.features[2].feature_name}</li>
                        <li>${modal.features[3].feature_name}</li>
                    </ul>
                </div>
                
                <div>
                    <h3>Integrations</h3>
                    <ul class="text-light-emphasis">
                        <li>${modal?.integrations ? modal.integrations[0] : "No Data found"}</li>
                        <li>${modal?.integrations ? modal.integrations[1] : "No Data found"}</li>
                        <li>${modal?.integrations ? modal.integrations[2] : "No Data found"}</li>
                    </ul>
                </div>
            </div>


            
        </div>



        <div class= "text-center position-relative">
          <div>
             ${acc}
          </div>
            <img class="img-fluid rounded" src="${modal.image_link[0]}" alt="">

            <h4 class="mt-3">${modal?.input_output_examples ? modal.input_output_examples[0].input : "Can you give any example?"}</h4>
            <p>${modal?.input_output_examples ? modal.input_output_examples[0].output : "No! Not Yet! Take a break!!!"}</p>
            
        </div>
`;
    modalContainer.appendChild(modalDiv)

}

// modalLoadAi();


// seeAllFetch()
loadAi(6)
showAllBtn.addEventListener('click', () => {
    apiContainer.innerText = "";
    loadAi(12)
})

sortByDate.addEventListener('click', () => {
    apiContainer.innerText = "";
    loadAi(12, true)
})