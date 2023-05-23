import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from '../../utils/ThemeProvider';
import { useNavigation } from '@react-navigation/native';
import actionsCategory from "../../services/sqlite/Category";

export default function Category() {
    const navigation = useNavigation();
    const { darkModeEnabled } = useContext(ThemeContext);
    const [categories, setCategories] = useState([]);

    const handleCategoryDoubleClick = (category) => {
        // navigation.navigate('Edit', { category: category });
    };

    const loadCategories = () => {
        actionsCategory.all()
            .then((response) => setCategories(response))
            .catch((error) => console.error(`Erro ao criar nova categoria: ${error}`));
    };

    const deleteCategory = (id) => {
        actionsCategory.remove(id)
            .then((response) => setCategories(response))
            .catch((error) => console.error(`Erro ao criar nova categoria: ${error}`));

    }

    loadCategories()
    // console.log(categories)

    return (
        <View style={[styles.container, darkModeEnabled && styles.darkModeContainer]}>
            <View style={[styles.titleContainer, darkModeEnabled && styles.darkModeTitleContainer]}>
                <Text style={[styles.title, darkModeEnabled && styles.darkModeTitle]}>Minhas Categorias</Text>
            </View>
            <ScrollView>
                {/* Containers de tarefa */}
                {categories && categories.length > 0 ? (
                    categories.map((category) => (
                        <TouchableOpacity onPress={() => handleCategoryDoubleClick(category)} key={category.id}>
                            <View style={[styles.categoryContainer, darkModeEnabled && styles.darkModecategoryContainer]}>
                                <Text style={[styles.categoryText, darkModeEnabled && styles.darkModecategoryText]}>{category.title}</Text>
                                <View style={styles.buttonsContainer}>
                                    <Ionicons name="close-circle" size={50} color="#FF0000" onPress={() => deleteCategory(category.id)} />
                                    <Ionicons name="checkmark-circle" size={50} color="#30BB3D" />
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))
                ) : (
                    <Text>Nenhuma tarefa encontrada</Text>
                )}
            </ScrollView>

            <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('CreateCategory')}>
                <Ionicons name="add-circle" size={70} color="#1C6B3C" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    darkModeContainer: {
        backgroundColor: "#000",
    },
    titleContainer: {
        backgroundColor: "#1C6B3C",
        width: "100%",
        height: "11%",
        justifyContent: "center",
        alignItems: "center",
    },
    darkModeTitleContainer: {
        backgroundColor: "#000",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#fff",
    },
    darkModeTitle: {
        color: "#fff",
    },
    categoryContainer: {
        backgroundColor: "#F6FAFF",
        borderRadius: 10,
        padding: 20,
        marginBottom: 10,
        marginHorizontal: 10,
        marginTop: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 1,
        borderColor: "#000",
    },
    darkModecategoryContainer: {
        backgroundColor: "#333",
        borderColor: "#fff",
    },
    categoryText: {
        fontSize: 16,
    },
    buttonsContainer: {
        flexDirection: "row-reverse",
    },
    iconContainer: {
        position: "absolute",
        bottom: 20,
        right: 20,
    },
    darkModecategoryText: {
        color: "#fff",
    }
});