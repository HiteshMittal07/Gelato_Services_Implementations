import React from "react";
import "./App.css";
import { Button, Card, TextInput } from "flowbite-react";
import { SponsoredCall } from "./RelayERC2771/SponsoredCallERC2771";
import { SyncFeeCallERC2771 } from "./RelayERC2771/SyncFeeCallERC2771";
import Header from "./Header";
function App() {
  const update_number_sponsored = async () => {
    const updateNumber = (document.querySelector("#number") as HTMLInputElement)
      .value;
    await SponsoredCall(Number(updateNumber));
  };
  const update_number_syncfee = async () => {
    const updateNumber = (
      document.querySelector("#number2") as HTMLInputElement
    ).value;
    await SyncFeeCallERC2771(Number(updateNumber));
  };
  return (
    <div className="App">
      <Header />
      <div className="flex flex-row gap-5 justify-center mt-64">
        <Card className="max-w-sm">
          <h2>Sponsored Call ERC2771</h2>
          <h5 className="text-gray-600">Enter the Number here</h5>
          <TextInput id="number" />
          <p className="font-normal text-gray-700 dark:text-gray-400">
            This function is deducting the update number function fees from
            1Balance as this is a Sponsored Call ERC2771
          </p>
          <Button onClick={update_number_sponsored} color="dark">
            Update Number
            <svg
              className="-mr-1 ml-2 h-4 w-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Button>
        </Card>
        <Card className="max-w-sm">
          <h2>SyncFee Call ERC2771</h2>
          <h5 className="text-gray-600">Enter the Number here</h5>
          <TextInput id="number2" />
          <p className="font-normal text-gray-700 dark:text-gray-400">
            This function is deducting the update number function fees from the
            contract itself with fee token as native token as this sync fee
            call.
          </p>
          <Button onClick={update_number_syncfee} color="dark">
            Update Number
            <svg
              className="-mr-1 ml-2 h-4 w-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Button>
        </Card>
      </div>
    </div>
  );
}

export default App;
