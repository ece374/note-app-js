const addBtn = document.getElementById("addBtn");
const addTxt = document.getElementById("addTxt");
const title = document.getElementById("addtitle");
const container = document.querySelector(".container-fluid");


const shownotes = (() => {
    let arrays
    let notes = localStorage.getItem("notlarım")

    if (notes == null) {
        arrays = [];
    } else {
        arrays = JSON.parse(notes)
    }
    // localStorage.clear()
    arrays = JSON.parse(notes)

    const noteList = arrays?.map((notlar, index) => {

        //  console.log(notlar.Lock)
        if (notlar.Lock) {  //notlar.Lock=true ise
         //buradaki card-body e activite eklediğimde notu kilitledikten sonra açık kilitli ıkonun kalmasını istediğim
         //için sayfa yenilesem bile o icon kalıyor. ama ben bu activite eklemeseydım  sayfa yenilendiğinde  kapalı kilitli ıcon geri geliyordu. 
            return (`
            <div class="noteCard mx-2 card" style="width: 18rem;">
                            <div class="card-body active">
                            <h5 class="card-title">${notlar.title}</h5> 
                            <div class="block" id="note"  style="display:none;">
                                <p class="card-text">${notlar.text}</p>
                                <button  id=" ${index}" class="delete buttons" onclick="DeleteNote(this.id)">Delete Note</button>
                                <button id="${index}" class="edit buttons" onclick="EditNote(this)">Edit Note</button> 
                            </div>
                            <i class="fa fa-lock lockbutton" id=" ${index}" onclick="closeLock(this)" > </i>
                            <i class="fa fa-unlock-alt openlockbutton" aria-hidden="true"  id=" ${index}" onclick="openLock(this)"></i>
                            </div>
                </div>
            `
            )
        }
        else {//notlar.Lock=false ise
            //burdaki card-body sınıfına activite sınıfını eklersem bütün kilitleri açık kilit yapar.
            return (`
            <div class="noteCard mx-2 card" style="width: 18rem;">
                            <div class="card-body ">
                            <h5 class="card-title">${notlar.title}</h5> 
                            <div class="block" id="note">
                                <p class="card-text">${notlar.text}</p>
                                <button id=" ${index}" class="delete buttons" onclick="DeleteNote(this.id)">Delete Note</button>
                                <button id="${index}" class="edit buttons" onclick="EditNote(this)">Edit Note</button> 
                            </div>
                            <i class="fa fa-lock lockbutton" id=" ${index}" onclick="closeLock(this)" > </i>
                            <i class="fa fa-unlock-alt openlockbutton" aria-hidden="true" id=" ${index}" onclick="openLock(this)" ></i>
                            </div>
                </div>
            `
            )
        }
        //    console.log(note)

    }).join("")
    // container.insertAdjacentHTML("afterend", noteList)
    if (arrays != null) {
        container.innerHTML = noteList
    } else {
        container.innerHTML = "";
        //'<h3 style="color:red">boş</h3>'
    }
})
let takeps;

const closeLock = (e) => {

    const divBlock = e.parentElement.children[1]
    let notes = localStorage.getItem("notlarım")
    while (notes) {
        if (confirm("are you sure")) {
            alert("notunuz kitlendi")
            takeps = prompt("şifre belirleyiniz");
            e.closest('.card-body').classList.add('active'); //ıkonları çevreleyen div//bir koşula bağlı olduğu için buraya yazdık.ıkonu değiştirir.

            arrays = JSON.parse(notes)
            // arrays.Lock = !arrays.Lock;
            localStorage.setItem('notlarım', JSON.stringify(
                arrays.map((el, x) => {
                    return x === parseInt(e.id) ? { ...el, Lock: true } : el  //el={title: '1', text: 'lşret', Lock: true} arraydeki butun boyle objectleri yazdırır.
                   
                })
            ))
            return divBlock.style.display = "none";
       
        }
        else {
            alert("notunuzu kitlemeye izin vermediniz")
            return divBlock.style.display = "block"
        }
    }
    // localStorage.setItem('notlarım', JSON.stringify(arrays))
    shownotes()
}

/* 
kendime not: :((
e.closest('.card-body').classList.add('active'); bu satırı bir fonksiyon açıp içine yazarsam ve bu fonksiypnun adını
.card body sınıfını çevreleyen dile verirsem click="function()" diye. html kodunda yazmış olurum her türlü çalışır. ama ben sade notu kilitledikten sonra
çalışmasını istediğim için closeLock() fonksiyonumda yazdım.
*/

const openLock = (e) => {
    const divBlock = e.parentElement.children[1]
    let notes = localStorage.getItem("notlarım")
   
    if (notes) {
        let password = prompt("Please enter your password");
        if (password == takeps) {
            e.closest('.card-body').classList.remove('active'); //kilit açma ıkonuna bastığında bu ıkonu getirdiğimiz sınıf pasif kalırsa , eski kilit kalır.
            arrays = JSON.parse(notes)
    
            localStorage.setItem('notlarım', JSON.stringify(
                arrays.map((el, x) => {
                    return x === parseInt(e.id) ? { ...el, Lock: false } : el  //el={title: '1', text: 'lşret', Lock: true} arraydeki butun boyle objectleri yazdırır.
                })
            ))
            return divBlock.style.display = "block";
        }

    }


    shownotes()
}

const DeleteNote = ((index) => {

    let arrays
    let notes = localStorage.getItem("notlarım")

    if (notes == null) {
        arrays = [];
    } else {
        arrays = JSON.parse(notes)
    }
    //(index) .. da 1 öğenin yerini aldı.
    arrays.splice(index, 1)

    localStorage.setItem('notlarım', JSON.stringify(arrays))

    shownotes()
})

const EditNote = ((e) => {
    /*console.log(ebeveyn.innerHTML)
    console.dir(ebeveyn)*/
    const ebeveyn = e.previousSibling.previousSibling.previousSibling.previousSibling;
    const user_writing = ebeveyn.innerHTML //for text of card

    arrays = JSON.parse(localStorage.getItem("notlarım"))
    newarrays = arrays.filter(note => note.text != addTxt.value)
    localStorage.setItem("notlarım", JSON.stringify(arrays))
    addTxt.value = user_writing
    DeleteNote(e.id);
    shownotes()
})

addBtn.addEventListener("click", (e) => {

    e.preventDefault();
    let arrays
    let notes = localStorage.getItem("notlarım")

    if (notes == null) {
        arrays = [];
    } else {
        arrays = JSON.parse(notes)
    }

    const user_text = addTxt.value;
    const user_title = title.value;

    // dizi olarak tanımladığımda undefined ??
    const ınfo =
    {
        title: user_title,
        text: user_text,
        Lock: false
    }

    // console.log(ınfo)
    arrays.push(ınfo);
    if ((addTxt.value === "") && (title.value === "")) {
        alert("boş atma")
        // localStorage.setItem("notlarım", JSON.stringify([]));
    }
    // else if ((addTxt.value === "") || (title.value === "")) {}
    else {
        localStorage.setItem("notlarım", JSON.stringify(arrays));
        addTxt.value = "";
        title.value = "";
    }

    shownotes()
})

function fonks() {
    shownotes();
}

