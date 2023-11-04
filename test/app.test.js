import chai from "chai";

import chaiHttp from "chai-http";

import axios from "axios";
import readline from "readline";
const expect = chai.expect;

chai.use(chaiHttp);

//get jwt token here

describe("GET people data", () => {
  it("should return an array of people data", (done) => {
    // console.log("hmm");
    //get token and save it for other calls
    var sendtoken = "";
    const mainUrl = "https://pvldemo-production.up.railway.app/";
    axios
      .get(mainUrl + "get-token")
      .then((response) => {
        const token = response.data.token;
        sendtoken = token;
        // console.log(token, sendtoken);

        axios
          .get("https://pvldemo-production.up.railway.app/people", {
            headers: {
              authorization: sendtoken,
            },
          })
          .then((response) => {
            // console.log(response.data);
            expect(response).to.have.status(200);
            done();
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    // console.log("outside", sendtoken);
  });
});

describe("Update User data", () => {
  it("should update the database and return a success message", (done) => {
    var sendtoken = "";
    const mainUrl = "https://pvldemo-production.up.railway.app/";
    const formData = {
      Male: 65,
      Female: 45,
      Boy: 65,
      Girl: 77,
    };

    axios
      .get(mainUrl + "get-token")
      .then((response) => {
        const token = response.data.token;
        sendtoken = token;
        // console.log(token, sendtoken);
        // console.log(formData);

        // formData = JSON.stringify(formData);
        axios
          .post(
            "https://pvldemo-production.up.railway.app/users/update",
            formData,
            {
              headers: {
                authorization: sendtoken,
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            axios
              .get("https://pvldemo-production.up.railway.app/people", {
                headers: {
                  authorization: sendtoken,
                },
              })
              .then((response) => {
                // console.log(response.data);
                if (
                  response.data[0].Male === formData["Male"] &&
                  response.data[0].Female === formData["Female"] &&
                  response.data[0].Boy === formData["Boy"] &&
                  response.data[0].Girl === formData["Girl"]
                ) {
                  done();
                }
              });
          });
      })
      .catch((error) => {
        console.error("Error updating database:", error);
      });
  });
});
