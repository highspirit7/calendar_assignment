import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Popconfirm, message } from "antd";

import { showModalToAddSchedule } from "store/actions/modal";
import { deleteSchedule } from "store/actions/calendar";

import {
  QUESTION_TO_DELETE_SCHEDULE,
  MSG_AFTER_DELETE_SCHEDULE,
} from "constants";
import DateInCalendar from "./DateInCalendar";

const WeekOfCalendar = (props) => {
  const { startToSlice, endToSlice } = props;
  const dispatch = useDispatch();
  const calendarState = useSelector((state) => state.calendar);
  const { selectedMonth, selectedYYYYMM } = calendarState;

  const handleConfirmToDeleteSchedule = (data) => {
    dispatch(deleteSchedule(data));

    message.success(MSG_AFTER_DELETE_SCHEDULE);
  };

  const TDs = Object.keys(selectedMonth)
    .slice(startToSlice, endToSlice)
    .map((YYYYMMDD) => {
      let [year, month, date] = YYYYMMDD.split("-");

      const [selectedYYYY, selectedMM] = selectedYYYYMM.split("-");

      const today = new Date();
      const todayYYYYMMDD = `${today.getFullYear()}-${
        today.getMonth() + 1
      }-${today.getDate()}`;

      return (
        <TD
          key={YYYYMMDD}
          date={YYYYMMDD}
          isSelectedMonth={selectedMM == month}
        >
          <DateInCalendar
            isToday={YYYYMMDD === todayYYYYMMDD}
            year={year}
            month={month}
            date={date}
          />
          {selectedMonth[YYYYMMDD].map((item) => {
            if (item.isHoliday === "Y") {
              return (
                <Holiday key={`${item.name}_ID${item.id}`}>{item.name}</Holiday>
              );
            } else {
              return (
                <Popconfirm
                  title={QUESTION_TO_DELETE_SCHEDULE}
                  placement="right"
                  onConfirm={() =>
                    handleConfirmToDeleteSchedule({
                      scheduleId: item.id,
                      date: item.date,
                    })
                  }
                  okText="삭제"
                  cancelText="취소"
                  key={`${item.name}_ID${item.id}`}
                >
                  <Schedule>&#45;&nbsp;{item.name}</Schedule>
                </Popconfirm>
              );
            }
          })}
        </TD>
      );
    });

  return <tr>{TDs}</tr>;
};

export default WeekOfCalendar;

export const TD = styled.td`
  width: 150px;
  height: 100px;
  padding: 4px;
  padding-top: 2px;
  text-align: right;
  font-weight: 600;
  border: 1px solid;
  border-color: ${({ theme }) => theme.colors.secondary};
  background: ${(props) => {
    const { date } = props;
    const [YYYY, MM, DD] = date.split("-");
    const dateObj = new Date(YYYY, MM - 1, DD);

    if (dateObj.getDay() === 0 || dateObj.getDay() === 6) {
      return props.theme.colors.tertiary;
    }
  }};
  color: ${(props) => {
    const { date } = props;
    const [YYYY, MM, DD] = date.split("-");
    const dateObj = new Date(YYYY, MM - 1, DD);

    if (!props.isSelectedMonth) {
      return props.theme.colors.secondary;
    }

    if (dateObj.getDay() === 0 || dateObj.getDay() === 6) {
      return props.theme.colors.secondary;
    }
  }};
`;

const Holiday = styled.div`
  text-align: left;
  padding: 1px 6px;
  margin: 2px;
  font-size: 14px;
  background: ${({ theme }) => theme.colors.holiday};
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.primary};
`;

const Schedule = styled.div`
  text-align: left;
  padding: 1px 6px;
  margin: 2px;
  font-size: 14px;
  background: ${({ theme }) => theme.colors.schedule};
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
`;
