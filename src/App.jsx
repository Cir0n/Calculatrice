import './App.css'

function App() {
  // Manipulation directe du DOM (approche pédagogique du TP, useState non utilisé).
  const calculate = () => {
    const num1 = parseFloat(document.getElementById('number1').value)
    const num2 = parseFloat(document.getElementById('number2').value)
    const operation = document.getElementById('operation').value
    const resultEl = document.getElementById('result')

    // Les opérations unaires n'ont besoin que du premier nombre.
    const unaryOperations = ['sqrt', 'percent']

    // Validation des entrées : on vérifie que les nombres saisis sont valides.
    if (Number.isNaN(num1)) {
      resultEl.textContent = 'Erreur : veuillez saisir un premier nombre valide.'
      return
    }
    if (!unaryOperations.includes(operation) && Number.isNaN(num2)) {
      resultEl.textContent = 'Erreur : veuillez saisir un second nombre valide.'
      return
    }

    let result
    switch (operation) {
      case 'add':
        result = num1 + num2
        break
      case 'subtract':
        result = num1 - num2
        break
      case 'multiply':
        result = num1 * num2
        break
      case 'divide':
        if (num2 === 0) {
          resultEl.textContent = 'Erreur : division par zéro impossible.'
          return
        }
        result = num1 / num2
        break
      case 'power':
        result = num1 ** num2
        break
      case 'modulo':
        if (num2 === 0) {
          resultEl.textContent = 'Erreur : modulo par zéro impossible.'
          return
        }
        result = num1 % num2
        break
      case 'sqrt':
        if (num1 < 0) {
          resultEl.textContent = 'Erreur : racine carrée d’un nombre négatif.'
          return
        }
        result = Math.sqrt(num1)
        break
      case 'percent':
        // num1 % : exprime num1 en proportion (ex. 50 -> 0.5).
        result = num1 / 100
        break
      default:
        result = 'Opération invalide'
    }

    resultEl.textContent = `Résultat : ${result}`
    addToHistory(num1, num2, operation, result)
  }

  // Bonus : historique des calculs effectués pendant la session.
  const addToHistory = (num1, num2, operation, result) => {
    const symbols = {
      add: '+',
      subtract: '−',
      multiply: '×',
      divide: '÷',
      power: '^',
      modulo: '%',
    }

    let expression
    if (operation === 'sqrt') {
      expression = `√${num1}`
    } else if (operation === 'percent') {
      expression = `${num1}%`
    } else {
      expression = `${num1} ${symbols[operation]} ${num2}`
    }

    const history = document.getElementById('history')
    const item = document.createElement('li')
    item.textContent = `${expression} = ${result}`
    history.prepend(item)
  }

  const clearHistory = () => {
    document.getElementById('history').innerHTML = ''
  }

  return (
    <div id="calculator">
      <h1>Calculatrice Simple</h1>

      <input type="number" id="number1" placeholder="Premier nombre" />
      <input type="number" id="number2" placeholder="Second nombre" />

      <select id="operation">
        <option value="add">Addition (+)</option>
        <option value="subtract">Soustraction (−)</option>
        <option value="multiply">Multiplication (×)</option>
        <option value="divide">Division (÷)</option>
        <option value="power">Puissance (^)</option>
        <option value="modulo">Modulo (%)</option>
        <option value="sqrt">Racine carrée (√ du 1er)</option>
        <option value="percent">Pourcentage (1er en %)</option>
      </select>

      <button type="button" onClick={calculate}>
        Calculer
      </button>

      <div id="result"></div>

      <div id="history-section">
        <div id="history-header">
          <h2>Historique</h2>
          <button type="button" className="clear" onClick={clearHistory}>
            Effacer
          </button>
        </div>
        <ul id="history"></ul>
      </div>
    </div>
  )
}

export default App
