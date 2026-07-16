import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://10.0.2.2:5000/api/v1/belela/users/auth";

export async function loginWithGoogleToken(idToken: string) {
    const url = `${API_URL}/google/mobile`;

    console.log("GOOGLE LOGIN URL:", url);
    console.log("GOOGLE ID TOKEN PRESENT:", !!idToken);

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken }),
    });

    const text = await response.text();

    console.log("GOOGLE LOGIN STATUS:", response.status);
    console.log("GOOGLE LOGIN RAW RESPONSE:", text);

    const result = text ? JSON.parse(text) : {};

    if (!response.ok || !result.success) {
        throw new Error(
            result.error || result.message || "Connexion Google impossible"
        );
    }

    await AsyncStorage.setItem("token", result.token);
    await AsyncStorage.setItem("user", JSON.stringify(result.data));

    return result;
}