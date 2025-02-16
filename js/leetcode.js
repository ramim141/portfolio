async function fetchLeetCodeData(username) {
    try {
        const response = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`);
        if (!response.ok) throw new Error("LeetCode API error");

        const data = await response.json();
        console.log(data); // Debug API response

        if (!data.status || data.status !== "success") {
            throw new Error("Invalid LeetCode data");
        }

        // Update the HTML elements with the retrieved data
        document.getElementById('leetcode-title').textContent = `Ramu's LeetCode Stats`;
        document.getElementById('leetcode-ranking').textContent = `Ranking: #${data.ranking}`;
        document.getElementById('leetcode-total-solved').textContent = `${data.totalSolved} / ${data.totalQuestions}`;
        document.getElementById('leetcode-acceptance-rate').textContent = `${data.acceptanceRate}%`;
        document.getElementById('leetcode-easy').textContent = `${data.easySolved} / ${data.totalEasy}`;
        document.getElementById('leetcode-medium').textContent = `${data.mediumSolved} / ${data.totalMedium}`;
        document.getElementById('leetcode-hard').textContent = `${data.hardSolved} / ${data.totalHard}`;
        document.getElementById('leetcode-contrib').textContent = `${data.contributionPoints}`;

    } catch (err) {
        console.error("Error fetching LeetCode data:", err);
        document.getElementById('leetcode-card').innerHTML = `<div class="text-red-400 text-center">Error fetching LeetCode data</div>`;
    }
}

// Call function with your username
fetchLeetCodeData("ahramu584");
