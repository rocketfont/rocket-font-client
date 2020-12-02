import RocketFontLayout from "../../components/RocketFontLayout";
import {useEffect, useState} from "react";
import {PlayBackOfficeAxios} from "../../components/ajax/backofficeBackend";
import JsonResponse from "../../components/ajax/JsonResponse";
import {DatePicker, Table} from "antd";
import {Moment} from "moment";

interface MonthlyChargeData {
    fontFamilyName: string
    fontPricePerMinute: number
    fontPricePerRequest: number
    fontSrl: number
    sessionCount: number
    timeCount: number
    totalRequestPrice: number
    totalTimePrice: number
}

const MonthlyBill = () => {

    const [momentData , setMomentData] = useState(null as Moment | null)

    const [tableDataSource, setTableDataSource] = useState([] as MonthlyChargeData[])
    useEffect(() => {
        (async () => {
            if(momentData === null) return;
            var from = momentData.startOf('month').format('YYYY-MM-DD')
            var to = momentData.endOf('month').format('YYYY-MM-DD')
            const ajax = await PlayBackOfficeAxios.get<JsonResponse<MonthlyChargeData[]>>(`/api/v1/billing/monthlyCharge?from=${from}&to=${to}`)
            setTableDataSource(ajax.data.data);
        })();


    }, [momentData])

    const onChange = (date  : Moment | null, dateString: string) =>{
        if(date === null) return;
        setMomentData(date)
    }


    const columns = [
        {
            title : '폰트명',
            dataIndex : 'fontFamilyName',
            key : 'fontFamilyName',
        },
        {
            title : '요청수',
            dataIndex : 'sessionCount',
            key : 'sessionCount',
        },
        {
            title : '폰트사용료/요청',
            dataIndex : 'fontPricePerRequest',
            render : (data : number) => { return data/1e6 },
            key : 'fontPricePerRequest',
        },
        {
            title : '사용시간(분)',
            dataIndex : 'timeCount',
            key : 'timeCount',
        },
        {
            title : '폰트사용료/분',
            dataIndex : 'fontPricePerMinute',
            key : 'fontPricePerMinute',
            render : (data : number) => { return data/1e6 },
        },



    ]
    return (
        <RocketFontLayout>
            <>
                <h1>청구 날자를 확인해 주세요.</h1>
                <DatePicker onChange={onChange} picker="month" />
                <Table dataSource={tableDataSource} columns={columns}

                       summary={pageData => {
                           const totalCharge = pageData.reduce((prev, row) => {
                               return prev + row.fontPricePerRequest +  row.fontPricePerMinute
                           }, 0) / 1e6

                           return (
                               <>
                                   <Table.Summary.Row>
                                       <Table.Summary.Cell index={1}>총액 : {totalCharge} 원</Table.Summary.Cell>
                                   </Table.Summary.Row>
                               </>
                           );
                       }}
                />
            </>
        </RocketFontLayout>
    );

}
export default MonthlyBill