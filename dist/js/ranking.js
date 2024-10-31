import { LocalStorageUtil } from "./LocalStorageUtil.js";

document.addEventListener('DOMContentLoaded', async () => {
  const rankTable = document.getElementById('rank-table')
  const user =  await LocalStorageUtil.getCurrentUser()
  const users = await LocalStorageUtil.getUsers()



  users.sort((a, b) => a.score - b.score)
    .forEach((user, index) => {

      const wrapperDiv = document.createElement('div')
      wrapperDiv.className = "flex justify-between items-center bg-white dark:bg-gray-700 bg-opacity-10 dark:bg-opacity-10 p-4 rounded-lg transition-all duration-300 hover:bg-opacity-20 dark:hover:bg-opacity-20"

      const idRank = document.createElement('span')
      idRank.className = "w-1/12 text-center text-gray-800 dark:text-gray-200 font-bold"
      idRank.innerText = index + 1

      const playerName = document.createElement('span')
      playerName.className = "w-5/12 text-gray-800 dark:text-gray-200"
      playerName.innerText = user.name

      const playerScore = document.createElement('span')
      playerScore.className = "w-3/12 text-center text-gray-800 dark:text-gray-200"
      playerScore.innerText = user.score

      const medalIcon = document.createElement('span')
      medalIcon.className = "w-3/12 text-center text-gray-800 dark:text-gray-200"
      switch (index) {
        case 0:
          medalIcon.innerHTML = 'Gold'
          break;
        case 1:
          medalIcon.innerHTML = 'Silver'
          break;
        case 2:
          medalIcon.innerHTML = 'Bronze'
          break;
        default:
          break;
      }

      rankTable.appendChild(wrapperDiv)

      wrapperDiv.appendChild(idRank)
      wrapperDiv.appendChild(playerName)
      wrapperDiv.appendChild(playerScore)
      wrapperDiv.appendChild(medalIcon)
    });
});
