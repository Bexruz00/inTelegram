let elProductsList = document.querySelector(".products-list")
let eGetInfoBtn = document.querySelector(".get-info-btn")

let elInfoForm = document.querySelector(".info-form")
let elModalWrapper = document.querySelector(".modal-wrapper")
let elModalInner = document.querySelector(".modal-inner")

elModalWrapper.addEventListener("click", (e) => e.target.id == "wrapper" ? elModalWrapper.classList.add("scale-0") : elModalWrapper.classList.remove("scale-0"))

const token = "7693780520:AAE1eGAjrfkN_Iwx-e7SziAC6wxJUF0eMvE"
const CHAT_ID = "-1002382265603"
const HTTPtext = `https://api.telegram.org/bot${token}/sendMessage`
const HTTP = `https://api.telegram.org/bot${token}/sendPhoto`

async function getProducts(API){
    const promise = new Promise((resolve, reject) => {
        axios.get(API).then(res => {
            resolve(res.data.products);
        })
    })
    return promise
}

getProducts('https://dummyjson.com/products').then(result => {
    result.map(item => {
        let elItem = document.createElement("li")
        elItem.className = "w-[300px] p-2 rounded-md bg-slate-200"
        elItem.innerHTML = `
            <img class="mx-auto mb-2 h-[300px] object-contain" src="${item.images[0]}" alt="images" width-[300px] height-[300px]/>
            <h2 class="line-clamp-1 font-bold text-[22px] mb-2">${item.title}</h2>
            <p class="text-slate-400 line-clamp-3">${item.description}</p>
            <div class="flex items-center justify-between mt-5">
                <strong class="text-[23px]">${item.price}$</strong>
                <button onclick="handleClickBtn(${item.id})" class="w-[30%] p-2 rounded-md bg-[#EA738D] uppercase text-white font-simibold">Send</button>
            </div>
        `
        elProductsList.appendChild(elItem)
    })
    
})

function handleClickBtn(id){
    axios.get(`https://dummyjson.com/products/${id}`).then(res => {
        let message = `<b> ==== Product Info ====</b> \n`

        message += `<b>  </b> \n` 
        message += `<b>Title: </b>\n` 
        message += `<b>${res.data.title}</b> \n` 

        message += `<b>  </b> \n` 
        message += `<b>Description: </b>\n` 
        message += `<b>${res.data.description}</b> \n`

        message += `<b>  </b> \n` 
        message += `<b>Price: ${res.data.price}$</b> \n`

        const data = {
            chat_id: CHAT_ID,
            parse_mode: "html",
            caption: message,
            photo:res.data.images[0]
        }

        axios.post(HTTP, data)
    })
}

function handleGetBtnInfo(){
    elModalWrapper.classList.remove("scale-0")
}

elInfoForm.addEventListener("submit", function(e){
    e.preventDefault()
    let message = `<b> ---- User Info ---- </b> \n`
    message += `<b>  </b> \n`
    message += `<b>User name: ${e.target.username.value}</b> \n`
    message += `<b>Email: ${e.target.email.value}</b> \n`
    message += `<b>Phone number: ${e.target.phone_number.value}</b> \n`

    const data = {
        chat_id: CHAT_ID,
        parse_mode: "html",
        text: message
    }

    axios.post(HTTPtext, data).then( res => {
        elModalWrapper.classList.add("scale-0")
    })
})