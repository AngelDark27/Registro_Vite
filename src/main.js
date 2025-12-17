import './style.css'

const invia = document.getElementById("invia")
const cognome_html = document.getElementById("cognome")
const nome_html = document.getElementById("nome")
const voto_html = document.getElementById("voto")
const materia_html = document.getElementById("materia")
const giorno_html = document.getElementById("data_prova")
const ora_html = document.getElementById("ora")
const note_html = document.getElementById("note")
const username_html = document.getElementById("username")
const password_html = document.getElementById("password")

//controllo dei dati dello studente
function checkValue(){
  if (cognome_html.value === "" || nome_html.value === "" || giorno_html.value==="" || ora_html.value==="")
    return true 
  else return false
}


function checkAccess(){
  const u = username_html.value.trim()
  const p = password_html.value.trim()

  if (!username_html.value.trim() || !password_html.value.trim()) return true

  const users = window.docentiArray   //window = variabile globale
  const match = users.find(doc => String(doc.username) === u && String(doc.password) === p)
  return !match
}

async function caricaDocenti() {
  try {
    const response = await fetch("http://127.0.0.1:8090/api/collections/docenti/records")
    .then(docenti => {
    if (docenti.length > 0) {
    window.docentiArray = docenti
      }
    })
    const data = await response.json()
    const docenti = data.items || data
    return docenti
  } catch (err) {
    console.error('Errore caricamento docenti:', err)
    return []
  }
}

caricaDocenti().then(docenti => {
  if (docenti.length > 0) {
    window.docentiArray = docenti
  }
})

invia.onclick = async () => {
  if (checkValue()) {
    alert("Compilare tutti i campi obbligatori")
    return
  }

  await caricaDocenti()
  if (checkAccess()) {
    alert("Username e/o password errato/i")
    return
  }

  const dataOra = `${giorno_html.value}T${ora_html.value}:00.000Z`
  try {
    await fetch("http://127.0.0.1:8090/api/collections/registro/records", {
      method: "POST",
      body:JSON.stringify({
        cognome:cognome_html.value.trim(),
        nome:nome_html.value.trim(),
        docente:username_html.value.trim(),
        voto:voto(),
        materia:materia_html.value.trim(),
        data:dataOra,
        note:note_html.value.trim()
      }),
      headers:{
        "Content-Type":"application/json"
      }
    })
  } catch (err) {
    console.error('Errore invio record:', err)
    alert('Errore invio record, controlla la console')
    return
  }

  cognome_html.value = ""
  nome_html.value = ""
  voto_html.value = ""
  materia_html.value = ""
  giorno_html.value = ""
  ora_html.value = ""
  note_html.value = ""
}


const arte_html = document.getElementById("Arte")
const educazionefisica_html = document.getElementById("Educazione-fisica")
const geografia_html = document.getElementById("Geografia")
const inglese_html = document.getElementById("Inglese")
const italiano_html = document.getElementById("Italiano")
const matematica_html = document.getElementById("Matematica")
const musica_html = document.getElementById("Musica")
const scienza_html = document.getElementById("Scienza")
const storia_html = document.getElementById("Storia")
const tecnologia_html = document.getElementById("Tecnologia")
const cinque_html = document.getElementById("cinque")
const cinquecinque_html = document.getElementById("cinque-cinque")
const sei_html = document.getElementById("sei")
const seicinque_html = document.getElementById("sei-cinque")
const sette_html = document.getElementById("sette")
const settecinque_html = document.getElementById("sette-cinque")
const otto_html = document.getElementById("otto")
const ottocinque_html = document.getElementById("otto-cinque")
const nove_html = document.getElementById("nove")
const novecinque_html = document.getElementById("nove-cinque")
const dieci_html = document.getElementById("dieci")


function voto(){
  switch (voto_html.value) {
    case "cinque":
      return 5
    case "cinque-cinque":
      return 5.5
    case "sei":
      return 6
    case "sei-cinque":
      return 6.5
    case "sette":
      return 7
    case "sette-cinque":
      return 7.5
    case "otto":
      return 8
    case "otto-cinque":
      return 8.5
    case "nove":
      return 9
    case "nove-cinque":
      return 9.5
    case "dieci":
      return 10
  }
}