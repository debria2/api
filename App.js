import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';

const App = () => {
    const [tendencias, setTendencias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3000/tendencias')
            .then(response => {
                setTendencias(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
    if (error) return <Text>Erro ao carregar dados</Text>;

    return (
        <View style={styles.container}>
            <FlatList
                data={tendencias}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.title}>{item.nome}</Text>
                        <Text>{item.descricao}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    item: {
        padding: 16,
        marginBottom: 8,
        backgroundColor: '#f9f9f9',
        borderRadius: 4,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default App;
