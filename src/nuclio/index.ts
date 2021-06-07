import axios from "axios";

import Store from "@/store";

function defaultHeaders() {
  const token = Store?.getters?.["user/repoAdoptToken"];
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

function getAddress(port: number) {
  // @ts-ignore: config does exist
  return `http://${window.config.VUE_APP_NUCLIO_HOST}:${port}/`;
}

async function getPortForFunction(functionName: string) {
  const res = await (
    await fetch(
      // @ts-ignore: config does exist
      getAddress(window.config.VUE_APP_NUCLIO_PORT) + "api/functions",
    )
  ).json();

  return res[functionName].status.externalInvocationURLs[0].split(":", 2)[1];
}

let changeOwnerPort: number;
export async function changeOwner(repo: string, new_owner: string) {
  if (!changeOwnerPort) {
    changeOwnerPort = await getPortForFunction("change-owner");
  }

  await axios.post(getAddress(changeOwnerPort), {
    headers: defaultHeaders(),
    body: JSON.stringify({ repo, new_owner }),
  });
}

let exportDataPort: number;
export async function exportData() {
  if (!exportDataPort) {
    exportDataPort = await getPortForFunction("export-data");
  }

  await axios.post(
    getAddress(exportDataPort),
    {},
    {
      headers: defaultHeaders(),
    },
  );
}
