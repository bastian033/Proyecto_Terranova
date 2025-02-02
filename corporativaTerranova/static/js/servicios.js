document.addEventListener("DOMContentLoaded", () => {
    const listItems = document.querySelectorAll("#services > li");
    const sublistItems = document.querySelectorAll(".sublist-item");
    const imageContainer = document.getElementById("service-image");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    let images = [];
    let currentIndex = 0;
    let openSublist = null; // Referencia a la sublista abierta

    function handleSelection(item) {
        const imageUrls = item.dataset.images;
        if (imageUrls) {
            images = imageUrls.split(",");
            currentIndex = 0;
            updateImage();
        }
    }

    listItems.forEach((item) => {
        item.addEventListener("click", (event) => {
            const sublist = item.querySelector(".sublist");

            if (sublist) {
                event.stopPropagation(); // Evita que el clic se propague al documento

                // Si hay una sublista abierta y no es la misma, la cerramos
                if (openSublist && openSublist !== sublist) {
                    openSublist.style.maxHeight = "0";
                    openSublist.style.opacity = "0";
                    openSublist.classList.remove("visible");
                }

                if (sublist.classList.contains("visible")) {
                    sublist.style.maxHeight = "0";
                    sublist.style.opacity = "0";
                    sublist.classList.remove("visible");
                    openSublist = null;
                } else {
                    sublist.style.maxHeight = sublist.scrollHeight + "px";
                    sublist.style.opacity = "1";
                    sublist.classList.add("visible");
                    openSublist = sublist;
                }
            } else {
                handleSelection(item);
            }
        });
    });

    sublistItems.forEach((item) => {
        item.addEventListener("click", (event) => {
            event.stopPropagation();
            handleSelection(item);
        });
    });

    // Escuchar clics en cualquier parte del documento para cerrar la sublista
    document.addEventListener("click", () => {
        if (openSublist) {
            openSublist.style.maxHeight = "0";
            openSublist.style.opacity = "0";
            openSublist.classList.remove("visible");
            openSublist = null;
        }
    });

    function updateImage() {
        if (images.length > 0) {
            imageContainer.style.opacity = "0";
            setTimeout(() => {
                imageContainer.src = images[currentIndex];
                imageContainer.style.opacity = "1";
            }, 300);
        }
    }

    prevBtn.addEventListener("click", () => {
        if (images.length > 0) {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateImage();
        }
    });

    nextBtn.addEventListener("click", () => {
        if (images.length > 0) {
            currentIndex = (currentIndex + 1) % images.length;
            updateImage();
        }
    });
});
