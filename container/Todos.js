import {StyleSheet, View, Text, FlatList, Image} from "react-native";
import {Todo} from "./Todo";

export const Todos = ({todos, type, onTodoDone}) => {

    return (
        <View style={styles.todosContainer}>
            <Text>TODAY'S TASKS</Text>
            {todos[type].length
                ?
                <FlatList
                    data={todos[type]}
                    renderItem={({item}) => <Todo todo={item} type={type} onTodoDone={onTodoDone}/>}
                    keyExtractor={item => item.id}
                    style={styles.todos}
                /> :
                <View style={styles.pending}>
                    <Image style={styles.pendingIcon} source={require("../assets/todoPending.png")}></Image>
                    <Text>No task added currently. Please add new task</Text>
                </View>
            }

        </View>
    );
};

const styles = StyleSheet.create({
    todos: {
        marginTop: 20,
        height: "68%",
        width: "100%",
    },
    todosContainer: {
        marginTop: 50
    },
    pending: {
        height: "68%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    pendingIcon: {
        height: "70%",
        width: "70%",
        marginBottom: 40,
        marginTop: 80
    }
});
