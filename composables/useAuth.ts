export function useAuth() {
  const accessToken = useLocalStorage("awaw_access_token", "");

  return {
    accessToken,
  };
}
