const natural = require('natural');
const intentsData = require('../chatbot/intents.json');

// Classificador Naive Bayes treinado no boot com os padrões de cada intent
const classifier = new natural.BayesClassifier();

(function treinar() {
  intentsData.intents.forEach(intent => {
    if (intent.tag !== 'fallback') {
      intent.patterns.forEach(pattern => {
        classifier.addDocument(pattern.toLowerCase(), intent.tag);
      });
    }
  });
  classifier.train();
})();

function responder(req, res) {
  const { mensagem } = req.body;
  if (!mensagem || !mensagem.trim()) {
    return res.status(400).json({ erro: 'Mensagem vazia.' });
  }

  let tag = 'fallback';
  try {
    tag = classifier.classify(mensagem.toLowerCase().trim());
  } catch {
    tag = 'fallback';
  }

  const intent =
    intentsData.intents.find(i => i.tag === tag) ||
    intentsData.intents.find(i => i.tag === 'fallback');

  const resposta = intent.responses[Math.floor(Math.random() * intent.responses.length)];
  res.json({ resposta });
}

module.exports = { responder };
