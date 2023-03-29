import MapView, { Marker } from "react-native-maps";

import { StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";

export const MapScreen = ({ route }) => {
    const [coordinates, setCoordinates] = useState(null);

    useEffect(() => {
        if (route.params) {
            setCoordinates(route.params);
        }
    }, [route.params]);

    return (
        <View style={styles.container}>
            {coordinates && (
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: coordinates.params.latitude,
                        longitude: coordinates.params.longitude,
                        latitudeDelta: 0.05,
                        longitudeDelta: 0.05,
                    }}
                >
                    {
                        <Marker
                            coordinate={{
                                latitude: coordinates.params.latitude,
                                longitude: coordinates.params.longitude,
                            }}
                            title={coordinates.params.name}
                        />
                    }
                </MapView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "#fff",
    },

    map: { flex: 1 },

    title: {
        alignSelf: "center",
        marginTop: 32,
        marginBottom: 32,
        fontSize: 30,
        fontFamily: "robotoBold",
    },
});
