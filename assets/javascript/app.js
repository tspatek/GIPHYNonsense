$(document).ready(function () {
    var topics = [
        "Pride and Prejudice",
        "The Bone Clocks",
        "Seveneves",
        "Snow Crash",
        "The Singularity Is Near",
        "Wool",
        "Shift",
        "Dust",
        "Lord of the Rings",
        "The Silmarillion",
        "Harry Potter",
        "Station Eleven",
        "The Selfish Gene",
        "The Wind-Up Bird Chronicle",
        "I Know This Much Is True",
        "Nineteen Eighty Four",
        "Jane Eyre",
        "Brave New World",
        "The Handmaid's Tale",
        "Fahrenheit 451",
        "Wide Sargasso Sea",
        "I Am a Strange Loop"
    ];

    var imageData = [];

    function createButtons() {
        $("#book-buttons").empty();

        topics.forEach(function (item) {
            $("#book-buttons").append(`
            <button data-name="${item}" type="button" 
                    class="book btn btn-secondary m-1">
                ${item}
            </button>
        `)
        })
    }

    function getGifs() {
        $("#book-gifs").empty();

        var key = "IRvq0vrdq1P4M47brWt372RxgPae1bbs";
        var baseURL = "https://api.giphy.com/v1/gifs/search?";
        var limit = "10";
        var rating = "pg-13";

        var book = $(this).attr("data-name");

        var url = baseURL + "q=" + book + "&api_key=" + key +
            "&limit=" + limit + "&rating=" + rating;

        $.ajax({
            url: url,
            method: "GET"
        }).then(function (response) {
            imageData = response.data;

            imageData.forEach(function (item) {
                $("#book-gifs").append(`
                    <div class="text-center m-3">  
                        <p>Rating: ${item.rating}</p>
                        <img src=${item.images.fixed_height_still.url}
                        data-still=${item.images.fixed_height_still.url} 
                        data-animate=${item.images.fixed_height.url} 
                        data-state="still" class="gif m-1">
                    </div?
                `)
            })

            createButtons();
        });
    }

    function startStopGif() {
        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    }

    function addBook(event) {
        event.preventDefault();

        var newBook = $("#book-input").val().trim();

        if (newBook !== "") {
            topics.push(newBook);
            createButtons();
            $("#book-input").val("");
        }

    }

    createButtons();

    $("#add-book").on("click", addBook);

    $("#book-buttons").on("click", ".book", getGifs);

    $("#book-gifs").on("click", ".gif", startStopGif);
});