import nodeHtmlToImage from "node-html-to-image";

export const pickNumbers = () => {
  // create an array of numbers from 1 to 75
  let numbers = Array.from({ length: 75 }, (_, i) => i + 1);

  // shuffle the array
  for (let i = numbers.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }

  return numbers;
}

const range = (start, end = 15) => Array.apply(0, Array(end)).map((e, i) => (i + start));
const shuffleArray = (array) => {
  let clone = array.slice(0);
  for (let i = clone.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = clone[i];
    clone[i] = clone[j];
    clone[j] = temp;
  };
  return clone;
};

const randomColumn = start => {
  const array = range(start);
  return shuffleArray(array).slice(0, 5);
};

export const standardBingoCard = () => {
  const nColumn = randomColumn(31);
  nColumn[2] = 'Free';
  const card = {
    B: randomColumn(1),
    I: randomColumn(16),
    N: nColumn,
    G: randomColumn(46),
    O: randomColumn(61),
  };
  return card
};


export const visualizeCard = (bingoCard) => {
  let response = "```\n";
  response += "B\t\t\t\tI\t\t\t\tN\t\t\t\tG\t\t\t\tO\n";
  for (let i = 0; i < 5; i++) {
    response += bingoCard["B"][i] + "\t\t\t\t" + bingoCard["I"][i] + "\t\t\t\t" + bingoCard["N"][i] + "\t\t\t\t" + bingoCard["G"][i] + "\t\t\t\t" + bingoCard["O"][i] + "\n";
  }
  response += "```";

  return response
}

export const drawCardUsingAscii = (bingoCardData) => {
  let card = '';
  let topRow = "---------------------------------------------\n|       ||       ||       ||       ||       |\n|   B   ||   I   ||   N   ||   G   ||   O   |\n";
  let secondRow = "|       ||       ||       ||       ||       |\n";
  card += topRow;
  card += secondRow;
  for (let i = 0; i < 5; i++) {
    let row = "---------------------------------------------\n|       ||       ||       ||       ||       |\n";
    for (let key in bingoCardData) {
      let num = bingoCardData[key][i];
      if (num === "Free") {
        num = "Free";
      }

      const numLen = String(num).length
      if (numLen === 2) {
        row += `|  ${num}   |`;
      }

      if (numLen === 4) {
        row += `| ${num}  |`;
      }

      if (numLen === 1) {
        row += `|   ${num}   |`;
      }



    }
    row += '\n|       ||       ||       ||       ||       |\n';
    card += row;
  }

  card += '---------------------------------------------';
  return card;
};


const bingoCardData = {
  B: [14, 12, 3, 4, 9],
  I: [30, 26, 24, 23, 29],
  N: [43, 41, 'Free', 39, 45],
  G: [59, 52, 60, 50, 51],
  O: [75, 70, 64, 72, 65]
};
export const drawUsingHTML = async bingoCardData => {
  const htmlTemplate = `<!DOCTYPE html>
    <html>
      <head>
      <style>
          /* Add CSS styles for the bingo card table */
          body {
              display: grid;
              place-items: center;
          }

          table {
              border-collapse: collapse;
              font-size: 1.95em;
              background-color: #f2f2f2;
          }

          td {
              border: 1px solid white;
              padding: 2em;
              text-align: center;
          }

          .letter-header {
              font-weight: bold;
              background-color: #3dc769;
              color: black;
          }

          /* Add styles for the Free Cell */
          .free {
              padding: 0;
              color: black;
              font-size: 2em;
          }
      </style>
      </head>
      <body>
        <table>
         <tr>
            <td class="letter-header">B</td>
            <td class="letter-header">I</td>
            <td class="letter-header">N</td>
            <td class="letter-header">G</td>
            <td class="letter-header">O</td>
          </tr>
          <tr>
            <td>${bingoCardData.B[0]}</td>
            <td>${bingoCardData.I[0]}</td>
            <td>${bingoCardData.N[0]}</td>
            <td>${bingoCardData.G[0]}</td>
            <td>${bingoCardData.O[0]}</td>  
          </tr>
          <tr>
            <td>${bingoCardData.B[1]}</td>
            <td>${bingoCardData.I[1]}</td>
            <td>${bingoCardData.N[1]}</td>
            <td>${bingoCardData.G[1]}</td>
            <td>${bingoCardData.O[1]}</td>
          </tr>
          <tr>
            <td>${bingoCardData.B[2]}</td>
            <td>${bingoCardData.I[2]}</td>
            <td class="free">✵</td>
            <td>${bingoCardData.G[2]}</td>
            <td>${bingoCardData.O[2]}</td>
          </tr>
          <tr>
            <td>${bingoCardData.B[3]}</td>
            <td>${bingoCardData.I[3]}</td>
            <td>${bingoCardData.N[3]}</td>
            <td>${bingoCardData.G[3]}</td>
            <td>${bingoCardData.O[3]}</td>
          </tr>
          <tr>
            <td>${bingoCardData.B[4]}</td>
            <td>${bingoCardData.I[4]}</td>
            <td>${bingoCardData.N[4]}</td>
            <td>${bingoCardData.G[4]}</td>
            <td>${bingoCardData.O[4]}</td>
          </tr>
        </table>
      </body>
    </html>
    `

  return nodeHtmlToImage({
    html: htmlTemplate,
    quality: 100,
    type: 'jpeg',
    puppeteerArgs: {
      args: ['--no-sandbox'],
    },
    encoding: 'buffer',
  })
}


