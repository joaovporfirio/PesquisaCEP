limparForm = (endereco) => {
    
    document.getElementById('endereco').value = ''
    document.getElementById('bairro').value = ''
    document.getElementById('cidade').value = ''
    document.getElementById('estado').value = ''

}

preencherForm = (endereco) => {
    document.getElementById('endereco').value = endereco.logradouro
    document.getElementById('bairro').value = endereco.bairro
    document.getElementById('cidade').value = endereco.localidade
    document.getElementById('estado').value = endereco.uf

}
const Enumero = (numero) => /^[0-9]+$/.test(numero)

cepValido = (cep) => cep.length == 8 && Enumero(cep)

const pesquisarCep = async () => {
    limparForm()

    const cep = document.getElementById('cep').value
    const url = `https://viacep.com.br/ws/${cep}/json/`
    // fetch(url).then(Response => Response.json()).then(console.log)

    if (cepValido(cep)) {

        const dados = await fetch(url)
        const endereco = await dados.json()

        if (endereco.hasOwnProperty('erro')) {
            document.getElementById('endereco').value = 'CEP não encontrado'
        } else {

            preencherForm(endereco)

        }
    } else {
        document.getElementById('endereco').value = 'CEP incorreto'

    }
}



document.getElementById('cep').addEventListener('focusout', pesquisarCep)
