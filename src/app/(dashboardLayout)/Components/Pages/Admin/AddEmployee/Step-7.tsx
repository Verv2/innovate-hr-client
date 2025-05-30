"use client";

import Loading from "@/app/(commonLayout)/Components/UI/Loading/Loading";
import { useGetTemporaryEmployee } from "@/hooks/admin.hooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  User,
  Briefcase,
  Phone,
  CreditCard,
  FileText,
  GraduationCap,
  Award,
  Download,
  Calendar,
  MapPin,
  Mail,
  Building,
} from "lucide-react";
import Image from "next/image";

const Step7 = () => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getEmploymentTypeLabel = (type: string) => {
    return type
      .replace("_", " ")
      .toLowerCase()
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const getDocumentName = (url: string) => {
    const parts = url.split("-");
    return parts[parts.length - 1].replace(".pdf", "").replace(/[_]/g, " ");
  };

  const {
    data: temporaryEmployeeData,
    isLoading: temporaryEmployeeLoading,
    isSuccess: temporaryEmployeeSuccess,
  } = useGetTemporaryEmployee();

  if (temporaryEmployeeLoading) {
    return <Loading />;
  }

  console.log("Temporary Employee Data:", temporaryEmployeeData);

  if (temporaryEmployeeSuccess && !temporaryEmployeeData) {
    return <div>No temporary employee data found.</div>;
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-8 text-left">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600">
            Employee Profile
          </h1>
          <p className="text-slate-600">
            Complete employee information and documentation
          </p>
        </div>

        {/* Profile Overview */}
        <Card className="overflow-hidden border-0 shadow-lg p-0">
          <CardContent className="p-0">
            <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 h-[90px]"></div>
            <div className="relative px-6 pb-6">
              <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-16">
                {/* Profile Picture and Gender Badge */}
                <div className="flex flex-col items-center relative">
                  <div className="rounded-full p-1 bg-white shadow-xl">
                    <Image
                      src={
                        temporaryEmployeeData.data.recentPhotographUrl ||
                        "/placeholder.svg"
                      }
                      alt="Employee Photo"
                      width={128}
                      height={128}
                      className="w-32 h-32 rounded-full object-cover"
                    />
                  </div>
                  <Badge className="mt-2 shadow-md">
                    {temporaryEmployeeData.data.basicInfo.gender}
                  </Badge>
                </div>

                {/* Name, Job Title, Badges */}
                <div className="flex-1 space-y-2 pt-4">
                  <h2 className="text-3xl font-bold text-slate-900">
                    {temporaryEmployeeData.data.basicInfo.firstName}{" "}
                    {temporaryEmployeeData.data.basicInfo?.middleName}{" "}
                    {temporaryEmployeeData.data.basicInfo.lastName}
                  </h2>
                  <p className="text-xl text-slate-600">
                    {temporaryEmployeeData.data.employeeDetails.jobTitle}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-blue-500 hover:bg-blue-600">
                      {temporaryEmployeeData.data.employeeDetails.department}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-blue-200 text-blue-700"
                    >
                      {getEmploymentTypeLabel(
                        temporaryEmployeeData.data.employeeDetails
                          .employmentType
                      )}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-purple-200 text-purple-700"
                    >
                      {temporaryEmployeeData.data.basicInfo.maritalStatus}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Basic Information */}
          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300 pt-0">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 py-2 rounded-t-xl">
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <User className="h-5 w-5" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-500">
                    Date of Birth
                  </label>
                  <p className="flex items-center gap-2 mt-1 font-medium">
                    <Calendar className="h-4 w-4 text-blue-500" />
                    {formatDate(
                      temporaryEmployeeData.data.basicInfo.dateOfBirth
                    )}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-500">
                    Nationality
                  </label>
                  <p className="mt-1 font-medium">
                    {temporaryEmployeeData.data.basicInfo.nationality}
                  </p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-500">
                  Home Address
                </label>
                <p className="flex items-start gap-2 mt-1 font-medium">
                  <MapPin className="h-4 w-4 text-blue-500 mt-0.5" />
                  {temporaryEmployeeData.data.basicInfo.homeAddress}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Employee Details */}
          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300 pt-0">
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-indigo-100 py-2 rounded-t-xl">
              <CardTitle className="flex items-center gap-2 text-indigo-700">
                <Briefcase className="h-5 w-5" />
                Employee Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-500">
                    Employee ID
                  </label>
                  <p className="mt-1 font-mono font-medium">
                    {
                      temporaryEmployeeData.data.employeeDetails
                        .employeeIdNumber
                    }
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-500">
                    Date of Joining
                  </label>
                  <p className="flex items-center gap-2 mt-1 font-medium">
                    <Calendar className="h-4 w-4 text-indigo-500" />
                    {formatDate(
                      temporaryEmployeeData.data.employeeDetails.dateOfJoining
                    )}
                  </p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-500">
                  Department
                </label>
                <p className="flex items-center gap-2 mt-1 font-medium">
                  <Building className="h-4 w-4 text-indigo-500" />
                  {temporaryEmployeeData.data.employeeDetails.department}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contact */}
          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300 pt-0">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 py-2 rounded-t-xl">
              <CardTitle className="flex items-center gap-2 text-purple-700">
                <Phone className="h-5 w-5" />
                Emergency Contact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-500">
                  Contact Person
                </label>
                <p className="mt-1 font-medium">
                  {temporaryEmployeeData.data.contactInformation.name}
                </p>
                <p className="text-sm text-slate-500">
                  ({temporaryEmployeeData.data.contactInformation.relationship})
                </p>
              </div>
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center gap-2 p-2 rounded-md bg-purple-50">
                  <Phone className="h-4 w-4 text-purple-500" />
                  <span className="font-medium">
                    {temporaryEmployeeData.data.contactInformation.phoneNumber}
                  </span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-md bg-purple-50">
                  <Phone className="h-4 w-4 text-purple-500" />
                  <span className="font-medium">
                    {
                      temporaryEmployeeData.data.contactInformation
                        .emergencyPhoneNumber
                    }
                  </span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-md bg-purple-50">
                  <Mail className="h-4 w-4 text-purple-500" />
                  <span className="font-medium">
                    {temporaryEmployeeData.data.contactInformation.email}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Financial Information */}
          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300 pt-0">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-100 py-2 rounded-t-xl">
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <CreditCard className="h-5 w-5" />
                Financial Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-500">
                    Bank Name
                  </label>
                  <p className="mt-1 font-medium">
                    {temporaryEmployeeData.data.financialInformation.bankName}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-500">
                    Account Holder
                  </label>
                  <p className="mt-1 font-medium">
                    {
                      temporaryEmployeeData.data.financialInformation
                        .accountHolder
                    }
                  </p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-500">
                  Account Number
                </label>
                <p className="mt-1 font-mono font-medium">
                  {
                    temporaryEmployeeData.data.financialInformation
                      .accountNumber
                  }
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-500">
                  Bank Address
                </label>
                <p className="mt-1 font-medium">
                  {temporaryEmployeeData.data.financialInformation.bankAddress}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Identification Documents */}
        <Card className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300 pt-0">
          <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-100 py-2 rounded-t-xl">
            <CardTitle className="flex items-center gap-2 text-indigo-700">
              <FileText className="h-5 w-5" />
              Identification Documents
            </CardTitle>
          </CardHeader>
          <CardContent className="">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                <label className="text-sm font-medium text-slate-500">
                  Tax ID Number
                </label>
                <p className="mt-1 font-mono font-medium">
                  {
                    temporaryEmployeeData.data.identificationDocuments
                      .taxIdNumber
                  }
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                <label className="text-sm font-medium text-slate-500">
                  Insurance Number
                </label>
                <p className="mt-1 font-mono font-medium">
                  {
                    temporaryEmployeeData.data.identificationDocuments
                      .insuranceNumber
                  }
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                <label className="text-sm font-medium text-slate-500">
                  Social Security Number
                </label>
                <p className="mt-1 font-mono font-medium">
                  {
                    temporaryEmployeeData.data.identificationDocuments
                      .socialSecurityNumber
                  }
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                <label className="text-sm font-medium text-slate-500">
                  Visa Expiry Date
                </label>
                <p className="mt-1 font-medium">
                  {formatDate(
                    temporaryEmployeeData.data.identificationDocuments
                      .visaExpiryDate
                  )}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                <label className="text-sm font-medium text-slate-500">
                  Passport/National ID
                </label>
                <Button
                  variant="link"
                  className="mt-1 p-0 h-auto font-medium text-blue-600 hover:text-blue-800"
                  onClick={() =>
                    window.open(
                      temporaryEmployeeData.data.passportOrNationalIdUrl,
                      "_blank"
                    )
                  }
                >
                  View Document
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Documents */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Educational Certificates */}
          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300 pt-0">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 py-2 rounded-t-xl">
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <GraduationCap className="h-5 w-5" />
                Educational Certificates
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {temporaryEmployeeData.data.educationalCertificatesUrl.map(
                (url: string, index: number) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start border border-blue-200 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                    onClick={() => window.open(url, "_blank")}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    {getDocumentName(url)}
                  </Button>
                )
              )}
            </CardContent>
          </Card>

          {/* Professional Certificates */}
          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300 pt-0">
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-indigo-100 py-2 rounded-t-xl">
              <CardTitle className="flex items-center gap-2 text-indigo-700">
                <Award className="h-5 w-5" />
                Professional Certificates
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {temporaryEmployeeData.data.professionalCertificatesUrl.map(
                (url: string, index: number) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start border border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                    onClick={() => window.open(url, "_blank")}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    {getDocumentName(url)}
                  </Button>
                )
              )}
            </CardContent>
          </Card>

          {/* Contract Paperwork */}
          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300 pt-0">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 py-2 rounded-t-xl">
              <CardTitle className="flex items-center gap-2 text-purple-700">
                <FileText className="h-5 w-5" />
                Contract Paperwork
              </CardTitle>
            </CardHeader>
            <CardContent className="">
              <Button
                variant="outline"
                className="w-full justify-start border border-purple-200 hover:bg-purple-50 hover:text-purple-700 transition-colors"
                onClick={() =>
                  window.open(
                    temporaryEmployeeData.data.signedContractPaperworkUrl,
                    "_blank"
                  )
                }
              >
                <Download className="h-4 w-4 mr-2" />
                {getDocumentName(
                  temporaryEmployeeData.data.signedContractPaperworkUrl
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <Card className="border-0 shadow-md pt-0">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-600">
              <div>
                <p>
                  Profile created: {formatDate(temporaryEmployeeData.createdAt)}
                </p>
                <p>
                  Last updated: {formatDate(temporaryEmployeeData.updatedAt)}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                >
                  Edit Profile
                </Button>
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  Export PDF
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Step7;
