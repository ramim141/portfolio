/****************************************************************************** 
 * 1) CODEFORCES 
 *    Uses the official Codeforces API: https://codeforces.com/apiHelp 
 ******************************************************************************/ 
async function fetchCodeforcesData(handle) {
  try {
      // Fetch basic user info
      const userInfoRes = await fetch(`https://codeforces.com/api/user.info?handles=${handle}`);
      const userInfoData = await userInfoRes.json();
      if (userInfoData.status !== 'OK') throw new Error('Codeforces user not found');

      const user = userInfoData.result[0];

      // Fetch rating history
      const ratingHistoryRes = await fetch(`https://codeforces.com/api/user.rating?handle=${handle}`);
      const ratingHistoryData = await ratingHistoryRes.json();
      const contestsCount = ratingHistoryData.status === 'OK' ? ratingHistoryData.result.length : 0;

      // Fetch problem-solving stats
      const statusRes = await fetch(`https://codeforces.com/api/user.status?handle=${handle}`);
      const statusData = await statusRes.json();
      const submissions = statusData.result;
      const acceptedCount = submissions.filter(s => s.verdict === 'OK').length;
      const wrongCount = submissions.filter(s => s.verdict === 'WRONG_ANSWER').length;

    

      // ✅ Store unique problems solved in a Set
      const allSolvedProblems = [];
    submissions.forEach(submission => {
      if (submission.verdict === "OK" || submission.verdict !== "FAILED") { // You can customize to include more verdicts
        const problemId = `${submission.problem.contestId}-${submission.problem.index}-${submission.problem.name ?? ''}`;
        allSolvedProblems.push(problemId);
      }
    });

    // Show total solved problems count (including repeats)
    const totalSolved = allSolvedProblems.length;
      // Update HTML
      document.getElementById('cf-title').textContent = 
          `${user.firstName ?? ''}` + `'s Codeforces Stats`;

      const yearsSince = user.registrationTimeSeconds
          ? Math.floor((Date.now() / 1000 - user.registrationTimeSeconds) / (3600 * 24 * 365))
          : '?';
         

          document.getElementById('cf-subtitle').innerHTML = `${user.rank} (max: ${user.maxRank}) | Since ${yearsSince} year${yearsSince > 1 ? 's' : ''}`;

          if (user.rank === 'Pupil') {
              document.getElementById('cf-subtitle').innerHTML = document.getElementById('cf-subtitle').innerHTML.replace('Pupil', '<span class="text-red-500">Pupil</span>');
          }
          

          document.getElementById('cf-rating').innerHTML = `
          <span class="flex items-center justify-between w-full">
              <span class="flex items-center">
                  <img src="./images/star.png" class="w-6 h-6 mr-2">
                  Current Rating
              </span>
              <span class="font-semibold ml-auto">${user.rating ?? 'N/A'}</span>
          </span>
      `;
      
      
      
      document.getElementById('cf-max-rating').innerHTML = `
      <span class="flex items-center justify-between w-full">
          <span class="flex items-center">
              <img src="./images/medal.png" class="w-6 h-6 mr-2">
              Max Rating
          </span>
          <span class="font-semibold ml-auto">${user.maxRating ?? 'N/A'}</span>
      </span>
  `;
  

    document.getElementById('cf-contests').innerHTML = `
    <span class="flex items-center justify-between w-full">
        <span class="flex items-center">
                <img src="./images/trophy.png" class="w-6 h-6 mr-2">
                Contests
        </span>
        <span class="font-semibold ml-auto">${contestsCount}</span>
    </span>
    `;

    document.getElementById('cf-accepted').innerHTML = `
    <span class="flex items-center justify-between w-full">
         <span class="flex items-center">
                <img src="./images/check (1).png" class="w-6 h-6 mr-2">
                Accepted
        </span>
        <span class="font-semibold ml-auto">${acceptedCount}</span>
    </span>
    `;

    document.getElementById('cf-wrong').innerHTML = `
    <span class="flex items-center justify-between w-full">
        <span class="flex items-center">
                <img src="./images/no.png" class="w-6 h-6 mr-2">
                Wrong
        </span>
        <span class="font-semibold ml-auto">${wrongCount}</span>
    </span>
`;

document.getElementById('cf-contrib').innerHTML = `
<span class="flex items-center justify-between w-full">
   <span class="flex items-center">
                <img src="./images/widget.png" class="w-6 h-6 mr-2">
                Contribution
        </span>
    <span class="font-semibold ml-auto">${user.contribution ?? 'N/A'}</span>
</span>
`;

// **Display Total Solved Problems**
document.getElementById('cf-total-solved').innerHTML = `
<span class="flex items-center justify-between w-full">
    <span class="flex items-center">
            <img src="./images/solve_prob.png" class="w-6 h-6 mr-2">
            Total Solved
    </span>
    <span class="font-semibold ml-auto">${totalSolved}</span>
</span>
`;

// here add total solve problems



  } catch (err) {
      console.error('Error fetching Codeforces data:', err);
  }
}



/****************************************************************************** 
* 4) Initialize everything once DOM is ready 
******************************************************************************/ 
document.addEventListener('DOMContentLoaded', () => {
  fetchCodeforcesData('ramim-ahmed');       // Replace with a valid handle
  
});
