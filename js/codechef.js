async function fetchCodeChefData() {
  try {
    const response = await fetch(
      "https://codechef-api.vercel.app/handle/ahramu584"
    );
    const data = await response.json();

    // Update name and status
    document.getElementById(
      "codechef-name"
    ).textContent = `${data.name}'s CodeChef Stats`;
    document.getElementById(
      "codechef-status"
    ).innerHTML = `${data.stars.replace(
      "2★",
      '<i class="fas fa-star text-yellow-400"></i> <i class="fas fa-star text-yellow-400"></i>'
    )} | Since 1 year`;

    // Update stats
    document.getElementById("codechef-current-rating").innerHTML = `
    <span class="flex items-center justify-between w-full">
     
        <span class="font-semibold ml-auto">${
          data.currentRating ?? "N/A"
        }</span>
    </span>
`;

    document.getElementById("codechef-highest-rating").textContent =
      data.highestRating;
    document.getElementById("codechef-contests").textContent =
      data.ratingData.length;
    

        
   // Calculate total solved problems by summing the problems solved across contests
   const totalSolvedProblems = data.heatMap.reduce((total, entry) => {
    return total + entry.value;
  }, 0);

  // Update total solved problems
  document.getElementById("codechef-total-solve").textContent =
    totalSolvedProblems;

   // Update total solved problems
  

    // Show the card after data is loaded
    document.getElementById("codechef-card").classList.remove("hidden");
  } catch (error) {
    console.error("Error fetching CodeChef data:", error);
  }
}

document.addEventListener("DOMContentLoaded", fetchCodeChefData);
