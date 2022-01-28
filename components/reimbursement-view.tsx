import { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import Reimbursement from "../dtos/dtos";
import ReimbursementItem from "./reimbursement-item";


export default function ReimbursementView(props: {id: string}){

    const [reimbursements, setReimbursements] = useState<Reimbursement[]>([]);
    
    useEffect(()=>{
        (async ()=>{
            const response = await fetch(`https://proj1backend.azurewebsites.net/reimbursements`);
            const reimbursements: Reimbursement[] = await response.json();
            const allOpenReimbursements = reimbursements.filter(r => r.isApproved === "Pending");
            setReimbursements(allOpenReimbursements.filter(r => r.ownerId !== props.id));
        })()
    },[])

    return(<View style={styles.container}>
        <Text style={styles.text}>Pending Reimbursements</Text>
        {reimbursements[0] ?
            <FlatList
                data={reimbursements}
                renderItem={({item})=><ReimbursementItem reimbursement={item} openReimbursements={reimbursements} setReim={setReimbursements}/>}
                keyExtractor={item => item.id}/>
            : <Text style={styles.text}>**No Open Reimbursements**</Text>
        }
    </View>)
}


const styles = StyleSheet.create({
    text: {
        color: 'white',
        fontSize: 20,
        marginBottom: 40,
        alignSelf: 'center'
    },
    container: {
        minWidth: '100%',
        alignContent: 'center'
    }
})