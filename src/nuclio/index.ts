import Store from "@/store";

function defaultHeaders() {
  const token = Store?.getters?.["user/repoAdoptToken"];
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

function getAddress(port: number) {
  return `http://${window.config.VUE_APP_NUCLIO_HOST}:${port}/`;
}

async function getPortForFunction(functionName: string) {
  const res = await (
    await fetch(getAddress(window.config.VUE_APP_NUCLIO_PORT) + "api/functions")
  ).json();

  return res[functionName].status.externalInvocationURLs[0].split(":", 2)[1];
}

let changeOwnerPort: number;
export async function changeOwner(
  owner: string,
  repo: string,
  new_owner: string,
) {
  if (!changeOwnerPort) {
    changeOwnerPort = await getPortForFunction("change-owner");
  }

  console.log(
    await (
      await fetch(getAddress(changeOwnerPort), {
        method: "POST",
        headers: defaultHeaders(),
        body: JSON.stringify({ owner, repo, new_owner }),
      })
    ).json(),
  );
}
