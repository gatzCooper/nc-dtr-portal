import { useState, useRef } from "react";
import ReactToPrint from "react-to-print";
import { VStack, Box, Flex, Card } from "@chakra-ui/react";
import { Layout, Table, Button, FormControl } from "@/components";
import { Reports as reportsList } from "@/data";
import { checkAuth } from "@/lib";
import { FormProvider, useForm } from "react-hook-form";

import { createColumn } from "react-chakra-pagination";

export default function Reports() {
  const [page, setPage] = useState(0);

  const methods = useForm({
    defaultValues: {
      name: "",
      from: "",
      to: "",
    },
  });

  const submit = async (data: any) => {
    console.log(data);
    //Perform search
  };

  const tableData = reportsList.map((report) => ({
    no: report.no,
    date: report.date,
    name: report.name,
    amArrival: report.amArrival,
    amDeparture: report.amDeparture,
    pmArrival: report.pmArrival,
    pmDeparture: report.pmDeparture,
    hours: report.hours,
    minutes: report.minutes,
    total: report.total,
  }));

  const columnHelper = createColumn<(typeof tableData)[0]>();

  const columns = [
    columnHelper.accessor("no", {
      cell: (info) => info.getValue(),
      header: "No",
    }),
    columnHelper.accessor("date", {
      cell: (info) => info.getValue(),
      header: "Date",
    }),
    columnHelper.accessor("name", {
      cell: (info) => info.getValue(),
      header: "Name",
    }),
    columnHelper.accessor("amArrival", {
      cell: (info) => info.getValue(),
      header: "Arrival (AM)",
    }),
    columnHelper.accessor("amDeparture", {
      cell: (info) => info.getValue(),
      header: "Departure (AM)",
    }),
    columnHelper.accessor("pmArrival", {
      cell: (info) => info.getValue(),
      header: "Arrival (PM)",
    }),
    columnHelper.accessor("pmDeparture", {
      cell: (info) => info.getValue(),
      header: "Departure (PM)",
    }),
    columnHelper.accessor("hours", {
      cell: (info) => info.getValue(),
      header: "Hours",
    }),
    columnHelper.accessor("minutes", {
      cell: (info) => info.getValue(),
      header: "Minutes",
    }),
    columnHelper.accessor("total", {
      cell: (info) => info.getValue(),
      header: "Total",
    }),
  ];

  const printRef: any = useRef();

  return (
    <Layout>
      <VStack w="100%">
        <Card display="flex" flexDirection="row" w="100%" p={5} gap={10}>
          <FormProvider {...methods}>
            <FormControl label="Name" type="text" name="name" />
            <FormControl label="From" type="datepicker" name="from" />
            <FormControl label="To" type="datepicker" name="to" />
            <Flex flexDirection="column-reverse" pb={2}>
              <Button
                label="Search"
                colorScheme="green"
                onClick={methods.handleSubmit(submit)}
              />
            </Flex>
          </FormProvider>
        </Card>
        <Table
          ref={printRef}
          title="DTR Reports"
          data={tableData}
          list={reportsList}
          page={page}
          itemsPerPage={6}
          columns={columns}
          setPage={setPage}
          actions={
            <Box>
              <ReactToPrint
                trigger={() => (
                  <Button label="Print" colorScheme="twitter" size="sm" />
                )}
                content={() => printRef.current}
              />
            </Box>
          }
        />
      </VStack>
    </Layout>
  );
}

export async function getServerSideProps(context: any) {
  return checkAuth(context, ({ isAuthenticated }: any) => {
    return {
      props: { isAuthenticated },
    };
  });
}
