let books = [];
const endpointApi = "https://guilhermeonrails.github.io/casadocodigo/livros.json";
const booksContainer = document.querySelector("#livros");
const btnBooks = document.querySelectorAll(".btn");
const btnPrice = document.querySelector("#btnOrdenarPorPreco");
const btnvailability = document.querySelector("#btnLivrosDisponiveis");
const totalPriceSection = document.querySelector("#valor_total_livros_disponiveis");

btnBooks.forEach((btn) =>
    btn.addEventListener("click", () => {
        const filteredBooks = filterBooksByCategory(btn.value);

        showBookList(filteredBooks);
    })
);

btnPrice.addEventListener("click", () => {
    const filteredBooks = books.sort((a, b) => {
        return a.preco - b.preco;
    });
    showBookList(filteredBooks);
});

btnvailability.addEventListener("click", () => {
    const filteredBooks = books.filter((book) => {
        return book.quantidade > 0;
    });
    showBookList(filteredBooks);
    showTotalPriceSection(filteredBooks);

});

getBooksApi();

async function getBooksApi() {
    const resp = await fetch(endpointApi);
    books = await resp.json();

    showBookList(books);
}

function showBookList(books) {

    booksContainer.innerHTML = "";
    books.forEach((book) => {
        const bookAvailability = book.quantidade > 0 ? "livro__imagens" : "livro__imagens indisponivel";
        totalPriceSection.innerHTML = "";
        booksContainer.innerHTML += `
        <div class="livro">
        <img class="${bookAvailability}" src="${book.imagem}" alt="${book.alt}" />
        <h2 class="livro__titulo">${book.titulo}</h2>
        <p class="livro__descricao">${book.autor}</p>
        <p class="livro__preco" id="preco">R$${book.preco.toFixed(2)}</p>
        <div class="tags">
            <span class="tag">${book.categoria}</span>
        </div>
    </div>
        `;
    });
}

function filterBooksByCategory(category) {
    const filteredBooks = books.filter((book) => {
        return book.categoria === category;
    });

    return filteredBooks;
}

function showTotalPriceSection(filteredBooks) {
    const totalPrice = filteredBooks.reduce((acc, book) => acc + book.preco, 0).toFixed(2);
    totalPriceSection.innerHTML += `<div class="livros__disponiveis">
    <p>Todos os livros disponíveis por R$ <span id="valor">${totalPrice}</span></p>
    </div>`;
}
