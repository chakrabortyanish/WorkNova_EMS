export const approveLeave = async (req, res) => {
    try {
      const { leaveId } = req.params;
  
      // Find leave
      const leave = await Leave.findById(leaveId);
  
      if (!leave) {
        return res.status(404).json({
          success: false,
          message: "Leave request not found",
        });
      }
  
      // Prevent double approval
      if (leave.status !== "Pending") {
        return res.status(400).json({
          success: false,
          message: `Leave is already ${leave.status}`,
        });
      }
  
      // Find employee
      const employee = await Employee.findById(leave.employee);
  
      if (!employee) {
        return res.status(404).json({
          success: false,
          message: "Employee not found",
        });
      }
  
      // Update leave status
      leave.status = "Approved";
      leave.reviewedBy = req.admin._id;
      leave.reviewedAt = new Date();
  
      await leave.save();
  
      // Update leave balance
      if (leave.leaveType === "Paid Time Off") {
        employee.leaveBalance.paidTimeOff.used += leave.totalDays;
      }
  
      if (leave.leaveType === "Sick Leave") {
        employee.leaveBalance.sickLeave.used += leave.totalDays;
      }
  
      if (leave.leaveType === "Personal Leave") {
        employee.leaveBalance.personalLeave.used += leave.totalDays;
      }
  
      // Check if leave is currently active
      const today = new Date();
  
      const startDate = new Date(leave.startDate);
      const endDate = new Date(leave.endDate);
  
      // Remove time portion
      today.setHours(0, 0, 0, 0);
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(0, 0, 0, 0);
  
      if (today >= startDate && today <= endDate) {
        employee.status = "On Leave";
      }
  
      await employee.save();
  
      return res.status(200).json({
        success: true,
        message: "Leave approved successfully",
        leave,
        employee,
      });
  
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };