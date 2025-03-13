const loadCategoryButtons = () => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/categories`)
    .then((res) => res.json())
    .then((data) => {
      displayCategoryButton(data.categories);
    });
};

// load category button
const displayCategoryButton = (categoriesButtons) => {
  const buttonContainer = document.getElementById("button-container");
  for (const button of categoriesButtons) {
    const createButton = document.createElement("button");
    createButton.classList.add("btn", "btn-sm");
    createButton.innerText = button.category;
    buttonContainer.appendChild(createButton);

    createButton.addEventListener("click", () => {
      loadCategoryVideos(button.category_id);
      const selectedButton = document.querySelectorAll(
        "#button-container button"
      );
      for (const button of selectedButton) {
        button.classList.remove("bg-red-500", "text-white");
      }
      createButton.classList.add("bg-red-500", "text-white");
    });
  }
};

const loadAllVideos = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => {
      const selectedButton = document.querySelectorAll(
        "#button-container button"
      );
      for (const button of selectedButton) {
        button.classList.remove("bg-red-500", "text-white");
      }
      document
        .getElementById("first-button")
        .classList.add("bg-red-500", "text-white");
      displayAllVideos(data.videos);
    });
};

const loadVideoDetails = (id) => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${id}`)
    .then((res) => res.json())
    .then((data) => {
      showVideoDetails(data.video);
    });
};

const showVideoDetails = (video) => {
  console.log(video);
  const { title, thumbnail, authors, others } = video;
  console.log(authors);
  document.getElementById("my_modal_2").showModal();

  const showDetail = document.getElementById('details-container');
  showDetail.innerHTML = `
  <h1 class="text-2xl font-bold text-center mb-5">Song Name - <span class="text-blue-500">${title}</span> </h1>
  <img class="rounded-lg" src="${thumbnail}" alt="">
  <p class="mt-5 text-gray-500"> <span class="text-black font-bold">Profile Name - </span> ${authors[0].profile_name}</p>
  <p class="mt-5 text-gray-500"> <span class="text-black font-bold">Views - </span> ${others.views}</p>
  `
};

const loadCategoryVideos = (id) => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      displayAllVideos(data.category);
    });
};

const displayAllVideos = (videos) => {
  const videoContainer = document.getElementById("show-video");
  videoContainer.innerHTML = "";
  if (videos.length === 0) {
    videoContainer.innerHTML = `
        <section id="error-layout" class="col-span-full mt-10 flex flex-col justify-center  items-center">
            <img src="./images/Icon.png" alt="">
            <h1 class="text-2xl font-bold">Oops!! There are no videos</h1>
        </section>
        `;
  }

  videos.forEach((video) => {
    console.log(video.authors[0].verified);
    const createDiv = document.createElement("div");
    createDiv.classList.add("p-5", "shadow-lg", "rounded");
    createDiv.innerHTML = `
        <img class="w-full h-40 object-cover rounded" src="${video.thumbnail}" alt="">
        <div class="mt-8 flex gap-x-4">
            <div>
             <img class="w-10 h-10 object-cover rounded-full border border-black p-[2px]" src="${video.authors[0].profile_picture}" alt="">
            </div>
            <div>
                <h1 class="text-xl font-semibold">${video.title}</h1>
                <div class="flex items-center gap-x-2">
                <p class="text-sm mt-1 text-gray-500">${video.authors[0].profile_name}</p>
                ${video.authors[0].verified === true ? `<img class="w-4 h-4 mt-1" src="./images/check.png">` : ''}
                </div>
                <p class="text-sm mt-1 text-gray-500">${video?.others?.views} views</p>
            </div>
            </div>
            <button onclick="loadVideoDetails('${video.video_id}')" class="mt-8 btn btn-wide">Show Details</button>
        `;
    videoContainer.appendChild(createDiv);
  });
};

loadCategoryButtons();