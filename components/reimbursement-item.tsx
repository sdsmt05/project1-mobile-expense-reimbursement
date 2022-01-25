import { useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text, Button, TextInput } from "react-native";
import Reimbursement, { IsApproved } from "../dtos/dtos";
import ReimbursementView from "./reimbursement-view";

export default function ReimbursementItem(props: {reimbursement: Reimbursement, openReimbursements: Reimbursement[], setReim: Function}){

    const [expanded, setExpanded] = useState(false);
    const [mgrComment, setMgrComment] = useState("");

    const {reimbursement, openReimbursements, setReim} = props;

    const updatedReimbursement: Reimbursement = {...reimbursement}

    async function handlePress(isApproved: IsApproved){
        isApproved === IsApproved.yes ? updatedReimbursement.isApproved = IsApproved.yes :
            updatedReimbursement.isApproved = IsApproved.no
        if(mgrComment)
            updatedReimbursement.mgrComment = mgrComment;

        const response = await fetch(`https://proj1backend.azurewebsites.net/reimbursements/${updatedReimbursement.id}`, {
            method: 'PUT',
            body: JSON.stringify(updatedReimbursement),
            headers: {'content-type': 'application/json'}
        })

        if(response.status === 201){
            alert("Successfully Submitted");
            openReimbursements.splice(openReimbursements.findIndex(r => r.id === updatedReimbursement.id), 1)
            setReim([...openReimbursements]);
        } else {
            alert("THERE WAS AN ERROR UPDATING THE REIMBURSEMENT");
        }
    }

    return(<TouchableOpacity style={styles.wrapper} onPress={() => setExpanded(!expanded)}>
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.text}>{reimbursement.ownerName}</Text>
                <Text style={styles.text}>${reimbursement.amount}</Text>
            </View>
        </View>
        {expanded &&
            <View>
                <Text style={styles.detailsContainer}>{reimbursement.reason}</Text>
                <TouchableOpacity>
                    <TextInput style={styles.input} placeholder="Comment (optional)" onChangeText={t => setMgrComment(t)}/>
                </TouchableOpacity>
                
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'stretch'}}>
                    <View style={styles.buttons}>
                        <Button color={'green'} title="Approve" onPress={() => handlePress(IsApproved.yes)}/>
                    </View>
                    <View style={styles.buttons}>
                        <Button color={'red'} title="Deny" onPress={() => handlePress(IsApproved.no)}/>
                    </View>
                </View>
            </View>
        }
    </TouchableOpacity>)
}



const styles = StyleSheet.create({
    wrapper: {
        borderColor: 'gray',
        backgroundColor: '#6d6477',
        borderWidth: 1,
        margin: 5,
        borderRadius: 5
    },
    container: {
        flexDirection: 'row'
    },
    textContainer: {
        justifyContent: 'space-around',
        margin: 10,
    },
    detailsContainer: {
        margin: 10,
        color: 'white',
        fontSize: 20,
        fontStyle: "italic"
    },
    text: {
        color: 'white',
        fontSize: 20
    },
    buttons: {
        minWidth: '50%'
    },
    input: {
        backgroundColor: 'white',
        height: 40,
        marginBottom: 5,
        marginLeft: 5,
        marginRight: 5,
        padding: 5
    }
})