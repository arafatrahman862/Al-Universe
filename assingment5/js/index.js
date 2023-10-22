const loadPage = async() =>{
    const url = `https://openapi.programming-hero.com/api/ai/tools`
const res = await fetch(url);
const data = await res.json();
displayPage(data.data.tools.slice(0, 6));

}

const showMore = () => {
    const URL = `https://openapi.programming-hero.com/api/ai/tools`;
    fetch(URL)
        .then((res) => res.json())
        .then((data) => displayPage(data.data.tools))
}


const displayPage = (pages) =>{
 const pagesContainer = document.getElementById('page-container');

 pagesContainer.innerHTML = '';
const showAll = document.getElementById('show-all');


if( pages.length  <= 6){
    // pages = pages.slice(0,6);
    showAll.classList.remove('d-none');
    // pages = pages.slice(6,pages.length);
}else{
    
 showAll.classList.add('d-none');
}

sort = (a,b) =>{
    const dateA = a;
    const dateB = b;
    if(dateA < dateB) return 1;
    else if (dateA > dateB) return -1;
    return 0;
}



 pages.forEach(page => {
    const pageDiv = document.createElement('div') ;
    pageDiv.classList.add('col');
    
pageDiv.innerHTML = `
    <div class="card">
    <img src="${page.image}" class="card-img-top rounded-4 p-2" alt="...">
    <div class="card-body">
    <h5 class="card-title">Features</h5>
    <p>1. ${page.features[0]}</p>
    <p>2. ${page.features[1]}</p>
    <p>3. ${page.features[2]}</p>
    </div>
    <div class="d-flex justify-content-between  mb-4 border-top mx-3 ">
    <div class="mt-3">
    <p>${page.name}</p>
    <p> ${page.published_in}</p>
</div>
      
<button onclick="fetchPages('${page.id}')"  id="arrow"  class="btn btn-danger mt-3 fs-2" data-bs-toggle="modal" data-bs-target="#pageDetailModal"><a><i class="fa-solid fa-circle-arrow-right"></i><a></button>
    </div>
    </div>


`;

pagesContainer.appendChild(pageDiv);


 })
 
 toggleSpinner(false);
 

}

    const fetchPages = async id =>{
        console.log(id);
        const url =`https://openapi.programming-hero.com/api/ai/tool/${id}`;
             const res = await fetch(url);
             const data = await res.json();
            
            
             displayPageDetails(data.data);
    }

    

const toggleSpinner = isloading =>{
    const loaderSection = document.getElementById('loader');
    if(isloading){
        loaderSection.classList.remove('d-none');

    }
    else{
        loaderSection.classList.add('d-none');
    }
}




document.getElementById('btn-seeMore').addEventListener('click', function(){
    toggleSpinner(true);

showMore();

})


const displayPageDetails = page =>{
    const pageDetails = document.getElementById('modal-body');
    console.log(page.features[1].feature_name)
    pageDetails.innerHTML = `
    <div class="d-lg-flex gap-4 px-4  ">
    <div class=" border border-danger-subtle p-2 rounded bg-danger-subtle w-100">
<p class="fs-5 fw-semibold">
${page.description}
</p>
<div class="d-lg-flex gap-3 my-3 ">
    <div class="border p-3  rounded text-success fw-semibold bg-light-subtle" >${page.pricing[0].price ? page.pricing[0].price : 'Free of Cost/' } <br> ${page.pricing[0].plan}</div>
    <div class="border p-3 my-2 rounded text-warning fw-semibold bg-light-subtle">${page.pricing[1].price ? page.pricing[1].price : 'Free of Cost/'} <br>
    ${page.pricing[1].plan}</div>
    <div class="border p-3 rounded text-danger fw-semibold bg-light-subtle">${page.pricing[2].price ? page.pricing[2].price : 'Free of Cost/'} <br>
    
    ${page.pricing[2].plan}</div>
</div>
<div class="d-flex">
    <div>
        <p class="fs-5 mt-3 fw-semibold">Features</p>
<ul>
    <li>${page.features[1].feature_name ? page.features[1].feature_name : 'No data Found'}</li>
    <li>${page.features[2].feature_name ? page.features[2].feature_name : 'No data Found'}</li>
    <li>${page.features[3].feature_name ? page.features[3].feature_name : 'No data Found'}</li>
</ul>
    </div>
    <div>
        <p class="fs-5 mt-3 fw-semibold">Integrations</p>
        <ul>
            <li>${page.integrations[0] ? page.integrations[0] : 'No data Found'}</li>
            <li>${page.integrations[1] ? page.integrations[1] : 'No data Found'}</li>
            <li>${page.integrations[2] ? page.integrations[2] : 'No data Found'}</li>
        </ul>
    </div>
</div>
    </div>
    <div class="border rounded mt-3">
<div class="d-flex ">
<img class=" p-4 rounded-4   img-fluid" src="${page.image_link[0]}" alt="">
<p id="accuracy"><span class="badge  rounded-pill  text-bg-danger">${page.accuracy.score * 100 ? page.accuracy.score * 100 : 'No'}% accuracy</span></p></div>
<p class="px-5 fs-5 fw-semibold py-2">${page.input_output_examples[0].input}</p>
<p class="px-5 pb-3">${page.input_output_examples[0].output ? page.input_output_examples[0].output : 'No! Not Yet! Take a break!!!' }</p>
    </div>
</div>
    
    
    
    `;

}




loadPage();
