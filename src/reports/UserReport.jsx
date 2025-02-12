

import { Document, Image, Text, Page, View, StyleSheet } from '@react-pdf/renderer'
import { useEffect, useState } from 'react';
import useReports from '../hooks/useReports';

const styles = StyleSheet.create({
    page:{
        padding: '20px',
        flexDirection: 'column',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        textAlign: 'center',
        textTransform: 'uppercase',
        flexDirection: 'column',
        display: 'flex',
        alignItems: 'center',
        padding: '10px'
    },
    logo: {
        width: '300px',
        height: '200px',
        objectFit: 'cover',
        borderRadius: '3px',
        margin: 'auto'
    },
    section: {
        width: '80%',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'flex-end',
        flexDirection: 'column'
    },
    text: {
        fontSize: '11px',
        padding: '5px',
        textAlign: 'center'
    },
    table: {
        width: '80%',
        margin: '10rem auto',
        padding: '5px',
        fontSize: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    row:{
        flexDirection: 'row',
        borderBottom: '1px solid #ccc',
        marginTop: '5px',
        padding: '10px'
    },
    header:{
        width: '20%',
        textAlign: 'center',
        fontWeight: '800',
        textTransform: 'uppercase',
        color: 'royalblue'
    },
    cell: {
        width: '20%',
        textAlign: 'center', 
        color: '#222'
    },
    containerText: {
        width: '400px'
    }
});

export default function UserReport() {
   const {getDataReportUser, data} = useReports()
    useEffect(()=>{
        getDataReportUser()
    }, []);
    return (
     <Document>
        <Page size={"A4"} style={styles.page}>
            <View style={styles.section}>
                <Text style={styles.title}>Usuarios Lista</Text>
            </View>
            <View style={styles.containerText}>
                <Text style={styles.text}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur non sed explicabo, culpa blanditiis earum quaerat expedita tempore iure aliquam cum autem nulla velit magnam.</Text>
            </View>
            <View style={styles.table}>
                <View style={styles.row}>
                    <View style={styles.header}>
                        <Text>Id</Text>
                    </View>
                    <View style={styles.header}>
                        <Text>Nombre</Text>
                    </View>
                    <View style={styles.header}>
                        <Text>Apellido</Text>
                    </View>

                    <View style={styles.header}>
                        <Text>Telefono</Text>
                    </View>

                    <View style={styles.header}>
                        <Text>Email</Text>
                    </View>
                    <View style={styles.header}>
                        <Text>Cedula</Text>
                    </View>
                </View>
                {data.map((el, index)=> <View key={index} style={styles.row}>
                    <View style={styles.cell}>
                        <Text>{el.id}</Text>
                    </View>
                    <View style={styles.cell}>
                        <Text>{el.name}</Text>
                    </View>
                    <View style={styles.cell}>
                        <Text>{el.last_name}</Text>
                    </View>

                    <View style={styles.cell}>
                        <Text>{el.phone}</Text>
                    </View>

                    <View style={styles.cell}>
                        <Text>{el.email}</Text>
                    </View>
                    
                    <View style={styles.cell}>
                        <Text>{el.cedula}</Text>
                    </View>
                </View>)}
            </View>
        </Page>
     </Document>
    )
}
    
   