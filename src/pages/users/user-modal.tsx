import { Fragment, useState } from "react";
import {
  UseDisclosureProps,
  Grid,
  GridItem,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { FormControl, Modal, Button, Table } from "@/components";
import { createColumn } from "react-chakra-pagination";
import { useForm, FormProvider } from "react-hook-form";
import { UserSchedule } from "@/data";
import ScheduleModal from "./schedule-modal";

type Props = UseDisclosureProps;

export default function UserModal(props: Props) {
  const { isOpen = false, onClose = () => {} } = props;
  const [page, setPage] = useState(0);
  const methods = useForm();
  const { handleSubmit } = methods;
  const {
    isOpen: isAddScheduleOpen,
    onOpen: onAddScheduleOpen,
    onClose: onAddScheduleClose,
  } = useDisclosure();

  const submit = async (data: any) => {
    console.log(data);
  };

  const tableData = UserSchedule.map((sched) => ({
    day: sched.day,
    subjectCode: sched.subjectCode,
    startTime: sched.startTime,
    endTime: sched.endTime,
  }));

  const columnHelper = createColumn<(typeof tableData)[0]>();

  const columns = [
    columnHelper.accessor("day", {
      cell: (info) => info.getValue(),
      header: "Day",
    }),
    columnHelper.accessor("subjectCode", {
      cell: (info) => info.getValue(),
      header: "Subject Code",
    }),
    columnHelper.accessor("startTime", {
      cell: (info) => info.getValue(),
      header: "Start Time",
    }),
    columnHelper.accessor("endTime", {
      cell: (info) => info.getValue(),
      header: "End Time",
    }),
  ];

  return (
    <Fragment>
      <ScheduleModal isOpen={isAddScheduleOpen} onClose={onAddScheduleClose} />
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Add User"
        size="6xl"
        actions={
          <Button
            colorScheme="twitter"
            mr={3}
            onClick={handleSubmit(submit)}
            label="Save"
          />
        }
      >
        <VStack spacing={10}>
          <Grid templateColumns="repeat(12, 1fr)" gap={4} w="100%">
            <FormProvider {...methods}>
              <GridItem colSpan={6}>
                <FormControl type="text" name="idNo" label="ID No." />
              </GridItem>
              <GridItem colSpan={6}>
                <FormControl type="text" name="jobTitle" label="Job Title" />
              </GridItem>
              <GridItem colSpan={4}>
                <FormControl type="text" name="firstName" label="First Name" />
              </GridItem>
              <GridItem colSpan={4}>
                <FormControl
                  type="text"
                  name="middleName"
                  label="Middle Name"
                />
              </GridItem>
              <GridItem colSpan={4}>
                <FormControl type="text" name="lastName" label="Last Name" />
              </GridItem>
              <GridItem colSpan={3}>
                <FormControl type="text" name="contact" label="Contact" />
              </GridItem>
              <GridItem colSpan={3}>
                <FormControl type="text" name="email" label="Email" />
              </GridItem>
              <GridItem colSpan={6}>
                <FormControl type="text" name="address" label="Address" />
              </GridItem>
              <GridItem colSpan={6}>
                <FormControl type="text" name="password" label="Password" />
              </GridItem>
              <GridItem colSpan={6}>
                <FormControl type="text" name="status" label="Status" />
              </GridItem>
              <GridItem colSpan={6}>
                <FormControl type="text" name="department" label="Department" />
              </GridItem>
            </FormProvider>
          </Grid>

          <Table
            title="Schedule"
            data={tableData}
            list={UserSchedule}
            page={page}
            columns={columns}
            actions={
              <Button
                label="Add Schedule"
                colorScheme="green"
                size="sm"
                onClick={onAddScheduleOpen}
              />
            }
            setPage={setPage}
          />
        </VStack>
      </Modal>
    </Fragment>
  );
}
