function moveSlider(containerId) {
const container = document.getElementById(containerId);
const images = container.querySelectorAll(`#${containerId} .img-slider`);
const radioButtons = container.querySelectorAll(`#${containerId} .radio-btns input[type="radio"]`);

    let currentIndex = 0;

    const changeImage = () => {
    images.forEach((img, index) => {
        if (index === currentIndex) {
        img.classList.add('ativo');
        } else {
        img.classList.remove('ativo');
        }
    });

    radioButtons.forEach((radio, index) => {
        radio.checked = index === currentIndex;
    });

    currentIndex = (currentIndex + 1) % images.length;
    };

    setInterval(changeImage, 5000);

    radioButtons.forEach((radio) => {
    radio.addEventListener('click', () => {
        currentIndex = parseInt(radio.getAttribute('data-index'));
        changeImage();
    });
    });
}

window.addEventListener('load', () => {
    moveSlider('slider1');
    moveSlider('slider2');
});


const sliderImages = document.querySelectorAll('.img-slider');
const popup = document.getElementById('modal-container');
const popupImage = document.getElementById('img-modal');
const popupTitle = document.getElementById('title-modal');
const popupTags = document.getElementById('tags-modal');
const popupSynopsis = document.getElementById('modal-synopsis');
const closeButton = document.getElementById('close-mdl-container');

// Função para carregar os dados do arquivo JSON
async function carregarDadosImagens() {
  try {
    const resposta = await fetch('../js/JSON/infomgs.json');
    const dados = await resposta.json();
    return dados;
  } catch (erro) {
    console.error('Erro ao carregar dados das imagens:', erro);
    return [];
  }
}


function exibirDadosImagem(imageData) {
  popupImage.alt = `imagem do ${imageData.nome}`|| '';
  popupTitle.textContent = imageData.nome || '';
  popupTags.innerHTML = '';

  if (imageData.tags && imageData.tags.length > 0) {
    const maxTagsToShow = 3;
    const tagsToShow = imageData.tags.slice(0, maxTagsToShow);

    tagsToShow.forEach(tag => {
      const tagElement = document.createElement('a');
      tagElement.textContent = tag;
      popupTags.appendChild(tagElement);
    });

    if (imageData.tags.length > maxTagsToShow) {
      const verTudoButton = document.createElement('button');
      verTudoButton.textContent = 'Ver tudo';
      popupTags.appendChild(verTudoButton);

      verTudoButton.addEventListener('click', function() {
        window.location.href = `${imageData.nome}.html`; 
      });
    }}

  // Dividir a sinopse em parágrafos com base na quebra de linha '\n'
  const sinopseSplit = (imageData.sinopse || '').split('\n');
  popupSynopsis.innerHTML = ''; // Limpa o conteúdo anterior

  // Adiciona cada parágrafo em uma tag p
  sinopseSplit.forEach(paragrafo => {
    const paragrafoElement = document.createElement('p');
    paragrafoElement.textContent = paragrafo;
    popupSynopsis.appendChild(paragrafoElement);
  });
}

sliderImages.forEach((image, index) => {
  image.addEventListener('click', async function() {
    const dadosImagens = await carregarDadosImagens();
    if (index >= dadosImagens.length) {
      return;
    }

    const imageData = dadosImagens[index];
    exibirDadosImagem(imageData);
    const imageSrc = image.src;
    popupImage.src = imageSrc;

    popup.classList.add('ativo');
  });
});

closeButton.addEventListener('click', function() {
  popup.classList.remove('ativo');
});

window.addEventListener('click', function(event) {
  if (event.target === popup) {
    popup.classList.remove('ativo');
  }
});



