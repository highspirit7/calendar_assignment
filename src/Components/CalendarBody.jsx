import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Modal, Input, DatePicker, Popconfirm, message } from "antd";

import {
  initCalendar,
  addSchedule,
  deleteSchedule,
} from "store/actions/calendar";
import {
  showModalToAddSchedule,
  closeModalToAddSchedule,
} from "store/actions/modal";
import { DAYS } from "constants";

const CalendarBody = () => {
  const dispatch = useDispatch();
  const calendarState = useSelector((state) => state.calendar);
  const modalState = useSelector((state) => state.modal);

  const { selectedMonth, selectedYYYYMM, isTodayBtnClicked } = calendarState;
  const { isAddScheduleModalVisible } = modalState;

  const [scheduleNameForModal, setScheduleName] = useState("");
  const [scheduleDateForModal, setScheduleDate] = useState("");

  const onChangeScheduleName = (e) => {
    const { value } = e.target;

    setScheduleName(value);
  };

  const showModal = (date) => {
    setScheduleDate(date);
    dispatch(showModalToAddSchedule());
  };

  const handleOkForModal = () => {
    setScheduleName("");
    setScheduleDate("");

    dispatch(
      addSchedule({ name: scheduleNameForModal, date: scheduleDateForModal }),
    );

    message.success("성공적으로 스케줄을 추가하였습니다");

    dispatch(closeModalToAddSchedule());
  };

  const handleCancelForModal = () => {
    dispatch(closeModalToAddSchedule());
  };

  const handleConfirmToDeleteSchedule = (data) => {
    dispatch(deleteSchedule(data));

    message.success("성공적으로 스케줄을 삭제하였습니다");
  };

  function changeDateFormatInKorean(yyyymmdd) {
    const [yyyy, mm, dd] = yyyymmdd.split("-");

    return `${yyyy}년 ${mm}월 ${dd}일`;
  }

  function renderDatesInCalendar(startToSlice, endToSlice, index) {
    const TDs = Object.keys(selectedMonth)
      .slice(startToSlice, endToSlice)
      .map((YYYYMMDD) => {
        let [year, month, date] = YYYYMMDD.split("-");

        const [selectedYYYY, selectedMM] = selectedYYYYMM.split("-");

        const today = new Date();
        const todayYYYYMMDD = `${today.getFullYear()}-${
          today.getMonth() + 1
        }-${today.getDate()}`;

        date =
          YYYYMMDD === todayYYYYMMDD && isTodayBtnClicked ? (
            <Circle>{date}</Circle>
          ) : (
            date
          );

        const dateForCalendar =
          date === "1" ? `${month}월 ${date}일` : `${date}일`;

        if (date === "1") {
          return (
            <TD
              key={YYYYMMDD}
              date={YYYYMMDD}
              isSelectedMonth={selectedMM == month}
            >
              <TextDate onClick={() => showModal(YYYYMMDD)}>
                {month + "월 "}
                {date}일
              </TextDate>
              {selectedMonth[YYYYMMDD].map((item) => {
                if (item.isHoliday === "Y") {
                  return (
                    <Holiday key={`${item.name}_ID${item.id}`}>
                      {item.name}
                    </Holiday>
                  );
                } else {
                  return (
                    <Popconfirm
                      title="이 스케줄을 삭제하시겠습니까?"
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
        } else {
          return (
            <TD
              key={YYYYMMDD}
              date={YYYYMMDD}
              isSelectedMonth={selectedMM == month}
            >
              <TextDate onClick={() => showModal(YYYYMMDD)}>{date}일</TextDate>
              {selectedMonth[YYYYMMDD].map((item) => {
                if (item.isHoliday === "Y") {
                  return (
                    <Holiday key={`${item.name}_ID${item.id}`}>
                      {item.name}
                    </Holiday>
                  );
                } else {
                  return (
                    <Popconfirm
                      title="이 스케줄을 삭제하시겠습니까?"
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
        }
      });

    return <tr key={`${index}_week`}>{TDs}</tr>;
  }

  return (
    <>
      <StyledTable>
        <THead>
          <TR>
            {DAYS.map((day) => (
              <TH key={day}>{day}</TH>
            ))}
          </TR>
        </THead>
        <TBody>
          {Array.from({ length: 7 }, (v, i) => i).map((i) => {
            return renderDatesInCalendar(i * 7, i * 7 + 7, i + 1);
          })}
        </TBody>
      </StyledTable>
      <Modal
        title={changeDateFormatInKorean(scheduleDateForModal) + " 스케줄 추가"}
        visible={isAddScheduleModalVisible}
        okText="저장"
        cancelText="취소"
        onOk={() => handleOkForModal()}
        onCancel={() => handleCancelForModal()}
      >
        <Input
          onChange={onChangeScheduleName}
          value={scheduleNameForModal}
          placeholder="스케줄 이름을 입력하세요"
          maxLength={18}
        />
      </Modal>
    </>
  );
};

export default CalendarBody;

export const StyledTable = styled.table`
  // custom css goes here
  color: ${({ theme }) => theme.colors.primary};
`;

export const THead = styled.thead`
  // custom css goes here
  /* color: ${({ theme }) => theme.colors.secondary}; */
`;

export const TBody = styled.tbody`
  // custom css goes here
`;

export const TR = styled.tr`
  // custom css goes here
`;

export const TH = styled.th`
  // custom css goes here
  width: 100px;
  text-align: right;
  font-weight: 600;
  color: ${(props) => {
    if (props.children === "일" || props.children === "토") {
      return props.theme.colors.secondary;
    }
  }};
`;

export const Circle = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  text-align: center;
  /* margin: 5px 20px; */
  /* font-size: 15px; */
  background: ${({ theme }) => theme.colors.today};
  /* padding: 15px; */
  height: 24px;
  width: 24px;
  color: #fff;
`;

export const TD = styled.td`
  // custom css goes here
  width: 150px;
  height: 100px;
  padding: 4px;
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

const TextDate = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;

  &:hover {
    border-radius: 4px;
    background: #f4fcd9;
  }
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
