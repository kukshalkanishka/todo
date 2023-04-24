import {StatusBar} from 'expo-status-bar';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Todos} from "./container/Todos";
import {useState} from "react";
import {TodoAddModal} from "./container/TodoAddModal";


export default () => {
    const [addTodoModal, setAddTodoModal] = useState(false);
    const [todos, setTodos] = useState({work: [], personal: []});
    const [type, setType] = useState("work");
    const handleModalClose = () => setAddTodoModal(false);

    const handleTodoAdd = (todo, type) => {
        setTodos(prevTodos => ({...prevTodos, [type]: [...prevTodos[type], todo]}))
    }

    const handleTodoDone = (id, type) => {
        setTodos(prevTodos => {
            const todosToUpdate = [...prevTodos[type]];
            const todoPos = todosToUpdate.findIndex(todo => todo.id === id);
            const todoToUpdate = todosToUpdate[todoPos];
            todosToUpdate[todoPos] = {...todoToUpdate, done: !todoToUpdate.done};
            return {...prevTodos, [type]: todosToUpdate};
        })
    }
    const handleCategorySelect = (type) => {
        setType(type);
    }

    const handleWorkSelect = () => {
        console.log(">>>>.touched")
        handleCategorySelect("work");
    };

    const getCategoryStyles =(todoType) => [
        styles.category,
        todoType === type ?
            { borderWidth: 3 }
            : { borderWidth: 0 }
    ];

    return (
        <View style={styles.container}>
            <Text>What's up, Kanishka!</Text>
            <View style={styles.categoriesContainer}>
                <Text>Categories</Text>
                <View style={styles.categories}>
                    <TouchableOpacity style={getCategoryStyles("work")} onPress={handleWorkSelect}>
                        <View>
                            <Text sytle={styles.categoryName}>Business</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={getCategoryStyles("personal")} onPress={() => handleCategorySelect("personal")}>
                        <View><Text>Personal</Text></View>
                    </TouchableOpacity>
                </View>
            </View>
            <Todos todos={todos} type={type} onTodoDone={handleTodoDone}/>
            <StatusBar style="auto" backgroundColor="pink"/>
            <TodoAddModal visible={addTodoModal} onTodoAdd={handleTodoAdd} onClose={handleModalClose}/>
            <TouchableOpacity onPress={() => setAddTodoModal(true)}>
                <Image style={styles.addIcon} source={require("./assets/addIcon.png")}></Image>
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EDEDED',
        marginTop: 50,
        padding: 20
    },
    category: {
        width: "48%",
        height: 100,
        flexDirection: "row",
        padding: 20,
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 10,
        borderColor: "#98CCFD"
    },
    categories: {
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    categoriesContainer: {},
    categoryName: {},
    addIcon: {
        width: 60,
        height: 60,
        bottom: 50,
        left: "83%",
    },
});
