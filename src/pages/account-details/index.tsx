import { useState, useEffect } from "react";
import {
  VStack,
  Box,
  Grid,
  GridItem,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import { useForm, FormProvider } from "react-hook-form";
import { Layout, FormControl, Button, Card } from "@/components";
import ChangePasswordModal from "./change-password-modal";
import { checkAuth } from "@/lib";
import {
  JobtitleOptions,
  StatusOptions,
  DepartmentOptions,
  api_url,
} from "@/data";
import { toast } from "react-toastify";

export default function AccountDetails(props: any) {
  const { user } = props;
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const methods = useForm({
    defaultValues: user,
  });
  const { handleSubmit } = methods;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const submit = async (data: any) => {
    try {
      const response = await fetch(`${api_url}/api/User/${user.Username}`, {
        method: "PUT",
        body: JSON.stringify({ ...data }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = await response.json();

      toast.success("Account details saved successfully!");
    } catch (error) {
      toast.error("There was an error updating account details.");
    } finally {
      setIsEditing(false);
    }
  };

  return (
    <Layout user={user}>
      <ChangePasswordModal isOpen={isOpen} onClose={onClose} user={user} />
      <VStack w="100%">
        <Card
          title={"Account Details"}
          actions={
            <Box>
              {!isEditing && (
                <Button
                  label="Edit"
                  colorScheme="yellow"
                  size="sm"
                  mr={3}
                  onClick={() => setIsEditing((state) => !state)}
                />
              )}
              <Button
                label="Change Password"
                colorScheme="twitter"
                size="sm"
                onClick={onOpen}
              />
            </Box>
          }
          w={"100%"}
        >
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(submit)}>
              <Grid templateColumns="repeat(12, 1fr)" gap={4}>
                <GridItem colSpan={6}>
                  <FormControl
                    label="ID No."
                    type="text"
                    name="userNo"
                    isReadOnly={true}
                  />
                </GridItem>
                <GridItem colSpan={6}>
                  <FormControl
                    label="Job Title"
                    type="select"
                    name="JobTitle"
                    options={JobtitleOptions}
                    isReadOnly={true}
                  />
                </GridItem>
                <GridItem colSpan={4}>
                  <FormControl
                    label="First Name"
                    type="text"
                    name="fName"
                    isReadOnly={!isEditing}
                  />
                </GridItem>
                <GridItem colSpan={4}>
                  <FormControl
                    label="Middle Name"
                    type="text"
                    name="mName"
                    isReadOnly={!isEditing}
                  />
                </GridItem>
                <GridItem colSpan={4}>
                  <FormControl
                    label="Last Name"
                    type="text"
                    name="lName"
                    isReadOnly={!isEditing}
                  />
                </GridItem>
                <GridItem colSpan={6}>
                  <FormControl
                    label="Contact"
                    type="text"
                    name="contact"
                    isReadOnly={!isEditing}
                  />
                </GridItem>
                <GridItem colSpan={6}>
                  <FormControl
                    label="Email"
                    type="text"
                    name="email"
                    isReadOnly={!isEditing}
                  />
                </GridItem>
                <GridItem colSpan={6}>
                  <FormControl
                    label="Status"
                    type="select"
                    name="status"
                    options={StatusOptions}
                    isReadOnly={!isEditing}
                  />
                </GridItem>
                <GridItem colSpan={6}>
                  <FormControl
                    label="Department"
                    type="select"
                    name="department"
                    options={DepartmentOptions}
                    isReadOnly={!isEditing}
                  />
                </GridItem>
                <GridItem colSpan={12}>
                  <FormControl
                    label="Address"
                    type="text"
                    name="address"
                    isReadOnly={!isEditing}
                  />
                </GridItem>
              </Grid>
              <Flex
                gap={3}
                justifyContent={"flex-end"}
                mt={5}
                hidden={!isEditing}
              >
                <Button type="submit" label="Save" colorScheme="twitter" />
                <Button
                  label="Cancel"
                  colorScheme="gray"
                  onClick={() => setIsEditing(false)}
                />
              </Flex>
            </form>
          </FormProvider>
        </Card>
      </VStack>
    </Layout>
  );
}

export async function getServerSideProps(context: any) {
  return checkAuth(context, ({ isAuthenticated, user }: any) => {
    return {
      props: { isAuthenticated, user },
    };
  });
}
