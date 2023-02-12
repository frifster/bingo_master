import nodeHtmlToImage from "node-html-to-image";
import { PlayerCard } from "../types";

export const drawUsingHTML = async (bingoCardData: PlayerCard) => {
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
      `;

  return nodeHtmlToImage({
    html: htmlTemplate,
    quality: 100,
    type: "jpeg",
    puppeteerArgs: {
      args: ["--no-sandbox"],
    },
  });
};
