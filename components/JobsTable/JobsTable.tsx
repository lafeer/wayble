'use client';

import React, { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { Table } from '@mantine/core';
import { GlobalStateContext } from '@/context/GlobalStateContext';
import classes from './JobsTable.module.css';

export function JobsTable() {
  const {
    state: { jobs },
  } = useContext(GlobalStateContext);
  const router = useRouter();

  const rows = jobs.map((job) => (
    <Table.Tr
      key={job.company}
      className={classes.tableRow}
      onClick={() => router.push(`/job/${job.id}`)}
    >
      <Table.Td>{job.company}</Table.Td>
      <Table.Td>{job.title}</Table.Td>
      <Table.Td>{job.description}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Company Name</Table.Th>
          <Table.Th>Job Title</Table.Th>
          <Table.Th>About the Position</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}
