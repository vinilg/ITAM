import { Injectable } from "@angular/core";
import { HttpService } from '../base/services/http.service';
import { AppConstant } from '../app.constant';

@Injectable()
export class OcsService {

    constructor(private httpService: HttpService) { }

    ocsServiceConstant = {
        'postAllAssets': AppConstant.itamServiceUrl + 'hardware/search/advanced/assets',
        'exportAllSearchedAssets': AppConstant.itamServiceUrl + 'hardware/search/advanced/assets/export',
        'getAssetDetails': AppConstant.itamServiceUrl + 'hardware/assetDetail/',
        'getAssetBaseDetails':AppConstant.itamServiceUrl + 'hardware/baseAssetDetail/',
        'getTempAssetBaseDetails':AppConstant.itamServiceUrl + 'temp_hardware/baseAssetDetail/',
        'getAllSoftwaresForCI': AppConstant.itamServiceUrl + 'software/asset/softwareDetails/',
        'getHeaders': AppConstant.itamServiceUrl + 'hardware/get/headers',
        'getHardwareDeltaDetails': AppConstant.itamServiceUrl + 'delta/hardwareDetails',
        'getSoftwareDeltaDetails': AppConstant.itamServiceUrl + 'delta/softwareDetails',
        'postTempAssets': AppConstant.itamServiceUrl + 'temp_hardware/allAssets',
        'getTempAssetInfo': AppConstant.itamServiceUrl + 'temp_hardware/assetDetail/',
        'getTempSoftwareDetails': AppConstant.itamServiceUrl + 'temp_software/asset/softwareDetails/',
        'deltaUpdate': AppConstant.itamServiceUrl + 'delta/runDelta',
        'getSources': AppConstant.itamServiceUrl + 'delta/sources',
        'scanNow': AppConstant.itamServiceUrl + 'delta/scan',
        'getRelationShip': AppConstant.itamServiceUrl + 'hardware/get/ci_relation/',
        'getTempRelationShip':AppConstant.itamServiceUrl + 'temp_hardware/get/ci_relation/',
        'mergeHardwareChangedData' : AppConstant.itamServiceUrl + 'hardware/merge',
        'getFilterMasterData' : AppConstant.itamServiceUrl + 'hardware/filter/master',
        'getEditAssetDetails' : AppConstant.itamServiceUrl + 'hardware/assetDetails/edit/',
        'updateAssetDetails' : AppConstant.itamServiceUrl + 'hardware/assetDetails/update/',
        'dashboardDetails' : AppConstant.itamServiceUrl + 'dashboard/getHardwareDashboardDetails',
        'getFamilyWiseCategoryData' : AppConstant.itamServiceUrl + 'dashboard/assetFamily/category/',
        'exportData': AppConstant.itamServiceUrl + 'dashboard/export/',
        'postSoftwareSummaryData': AppConstant.itamServiceUrl + 'software/search/advanced/summary',
        'getSoftwareFilterMasterData' : AppConstant.itamServiceUrl + 'software/filter/master',
        'getSoftwareLicenseMasterData': AppConstant.itamServiceUrl + 'software/license/filter/master',
        'postLicenseSummaryData':AppConstant.itamServiceUrl + 'software/search/advanced/license/summary',
        'getSoftwareBasicDetails':AppConstant.itamServiceUrl + 'software/details/',
        'getAllLicense':AppConstant.itamServiceUrl + 'software/master/license',
        'getSoftwareDetailsBasedOnKeyword':AppConstant.itamServiceUrl + 'software/find/',
        'getSoftwareMappingForSelectedLicense':AppConstant.itamServiceUrl + 'software/license/software-mapping/',
        'postSoftwareToLicenseMappings':AppConstant.itamServiceUrl + 'software/license/mapping',
        'getLicenseDetailsForSelectedSoftware':AppConstant.itamServiceUrl + 'software/licenses/',
        'getInstallationDetailsForSelectedSoftware':AppConstant.itamServiceUrl + 'software/licenses/installations/',
        'getSoftwareDashboardData': AppConstant.itamServiceUrl + 'dashboard/software',
        'getLicenseDetails':AppConstant.itamServiceUrl + 'software/license/detail/',
        'getExcludedAssetInstalltionDetails' :AppConstant.itamServiceUrl + 'software/licenses/excluded/installations/',
        'postExcludeAssetToLicenseMappings': AppConstant.itamServiceUrl + 'software/exclude/ci-to-license/mapping',
        'getAssetExcludeReasonMaster' : AppConstant.itamServiceUrl + 'software/reason/master',
        'postAddNewLicense': AppConstant.itamServiceUrl + 'software/license/add',
        'editSelectedLicense' : AppConstant.itamServiceUrl + 'software/license/edit/',
        'getChildLicensesInfo' : AppConstant.itamServiceUrl + 'software/license/child/detail/',
        'updateLicenseDetails':AppConstant.itamServiceUrl + 'software/license/edit/',
        'getUserHistoryForSelectedCi':AppConstant.itamServiceUrl + 'hardware/asset/history/',
        'postLicenseExportData':AppConstant.itamServiceUrl + 'software/search/advanced/license/export',
        'importInStockAssets' : AppConstant.itamServiceUrl + 'hardware/import',
        'bulkUpdateAssets':AppConstant.itamServiceUrl + 'hardware/bulk/update',
        'userInfo' : AppConstant.userManagmentUrl + 'user/list/advanced?&size=10&page=0',
        'vcenterHostDetails':AppConstant.itamServiceUrl + 'hardware/host/vcenter/',
        'licenseMappingCalculation':AppConstant.itamServiceUrl + 'software/license/mapping/rules/',
        'getAllRelationshipType':AppConstant.itamServiceUrl + 'hardware/relationship/types',
        'getHostDataBasedOnSearch':AppConstant.itamServiceUrl + 'hardware/search/host/',
        'postAddNewRelationShip':AppConstant.itamServiceUrl + 'hardware/add/relation',


        

    }

    postTempAssets(queryString,searchParameters,successFn, cbFailureFn) {
        this.httpService.postHttp(this.ocsServiceConstant.postTempAssets+ queryString,searchParameters,successFn, cbFailureFn);
    }

    exportAllSearchedAssets(queryString,searchParameters,successFn, cbFailureFn) {
        this.httpService.postHttp(this.ocsServiceConstant.exportAllSearchedAssets+ queryString,searchParameters,successFn, cbFailureFn);
    }

    getTempAssetInfo(hardwareId, successFn, cbFailureFn) {
        this.httpService.getHttp(this.ocsServiceConstant.getTempAssetInfo + hardwareId, successFn, cbFailureFn);
    }

    getTempSoftwareDetails(hardwareId,queryString, successFn, cbFailureFn) {
        this.httpService.getHttp(this.ocsServiceConstant.getTempSoftwareDetails + hardwareId + queryString, successFn, cbFailureFn);
    }

    postAllAssets(queryString,searchParameters,successFn, cbFailureFn) {
        this.httpService.postHttp(this.ocsServiceConstant.postAllAssets + queryString,searchParameters,successFn, cbFailureFn);
    }

    getAssetDetails(hardwareId, successFn, cbFailureFn) {
        this.httpService.getHttp(this.ocsServiceConstant.getAssetDetails + hardwareId, successFn, cbFailureFn);
    }

    getAllSoftwaresForCI(hardwareId,queryString, successFn, cbFailureFn) {
        this.httpService.getHttp(this.ocsServiceConstant.getAllSoftwaresForCI + hardwareId + queryString, successFn, cbFailureFn);
    }

    getHeaders(successFn, cbFailureFn) {
        this.httpService.getHttp(this.ocsServiceConstant.getHeaders, successFn, cbFailureFn);
    }

    getHardwareDeltaDetails(successFn, cbFailureFn) {
        this.httpService.getHttp(this.ocsServiceConstant.getHardwareDeltaDetails, successFn, cbFailureFn);
    }

    getSoftwareDeltaDetails(successFn, cbFailureFn) {
        this.httpService.getHttp(this.ocsServiceConstant.getSoftwareDeltaDetails, successFn, cbFailureFn);
    }

    deltaUpdate(successFn, cbFailureFn) {
        this.httpService.getHttp(this.ocsServiceConstant.deltaUpdate, successFn, cbFailureFn);
    }

    getSources(successFn, cbFailureFn) {
        this.httpService.getHttp(this.ocsServiceConstant.getSources, successFn, cbFailureFn);
    }

    scanNow(data,cbSuccessFn,cbFailureFn){
        this.httpService.postHttp(this.ocsServiceConstant.scanNow,data,cbSuccessFn, cbFailureFn);
    }

    getRelationShip(hardwareId, successFn, cbFailureFn) {
        this.httpService.getHttp(this.ocsServiceConstant.getRelationShip + hardwareId, successFn, cbFailureFn);
    }

    getTempRelationShip(hardwareId, successFn, cbFailureFn) {
        this.httpService.getHttp(this.ocsServiceConstant.getTempRelationShip + hardwareId, successFn, cbFailureFn);
    }

    mergeHardwareChangedData(data,cbSuccessFn,cbFailureFn){
        this.httpService.postHttp(this.ocsServiceConstant.mergeHardwareChangedData,data,cbSuccessFn, cbFailureFn);
    }

    getAssetBaseDetails(hardwareId, successFn, cbFailureFn) {
        this.httpService.getHttp(this.ocsServiceConstant.getAssetBaseDetails + hardwareId, successFn, cbFailureFn);
    }

    getTempAssetBaseDetails(hardwareId, successFn, cbFailureFn) {
        this.httpService.getHttp(this.ocsServiceConstant.getTempAssetBaseDetails + hardwareId, successFn, cbFailureFn);
    }

    getFilterMasterData(successFn, cbFailureFn) {
        this.httpService.getHttp(this.ocsServiceConstant.getFilterMasterData, successFn, cbFailureFn);
    }

    getEditAssetDetails(hardwareId, successFn, cbFailureFn) {
        this.httpService.getHttp(this.ocsServiceConstant.getEditAssetDetails + hardwareId, successFn, cbFailureFn);
    }

    updateAssetDetails(hardwareId,data,successFn, cbFailureFn) {
        this.httpService.postHttp(this.ocsServiceConstant.updateAssetDetails + hardwareId, data,successFn, cbFailureFn);
    }

    getDashboardDetails(data,successFn, cbFailureFn) {
        this.httpService.postHttp(this.ocsServiceConstant.dashboardDetails, data,successFn, cbFailureFn);
    }

    exportData(selectedOption,successFn, cbFailureFn) {
        this.httpService.getHttp(this.ocsServiceConstant.exportData + selectedOption,successFn, cbFailureFn);
    }

    getFamilyWiseCategoryData(familyName,successFn, cbFailureFn) {
        this.httpService.getHttp(this.ocsServiceConstant.getFamilyWiseCategoryData + familyName,successFn, cbFailureFn);
    }

    postSoftwareSummaryData(queryString,searchParameters,successFn, cbFailureFn) {
        this.httpService.postHttp(this.ocsServiceConstant.postSoftwareSummaryData + queryString,searchParameters,successFn, cbFailureFn);
    }

    getSoftwareFilterMasterData(successFn, cbFailureFn){
        this.httpService.getHttp(this.ocsServiceConstant.getSoftwareFilterMasterData, successFn, cbFailureFn);
    }

    postLicenseSummaryData(queryString,searchParameters,successFn, cbFailureFn) {
        this.httpService.postHttp(this.ocsServiceConstant.postLicenseSummaryData + queryString, searchParameters,successFn, cbFailureFn);
    }

    getSoftwareLicenseMasterData(successFn, cbFailureFn){
        this.httpService.getHttp(this.ocsServiceConstant.getSoftwareLicenseMasterData, successFn, cbFailureFn);
    }

    getSoftwareBasicDetails(softwareId, successFn, cbFailureFn) {
        this.httpService.getHttp(this.ocsServiceConstant.getSoftwareBasicDetails + softwareId,successFn, cbFailureFn);
    }

    getAllLicense(successFn, cbFailureFn) {
        this.httpService.getHttp(this.ocsServiceConstant.getAllLicense,successFn, cbFailureFn);
    }

    getSoftwareDetailsBasedOnKeyword(keyword, successFn, cbFailureFn) {
        this.httpService.getHttp(this.ocsServiceConstant.getSoftwareDetailsBasedOnKeyword + keyword,successFn, cbFailureFn);
    }

    getSoftwareMappingForSelectedLicense(licenseId, successFn, cbFailureFn) {
        this.httpService.getHttp(this.ocsServiceConstant.getSoftwareMappingForSelectedLicense + licenseId,successFn, cbFailureFn);
    }

    postSoftwareToLicenseMappings(softwareToLicenseMapping, successFn, cbFailureFn){
        this.httpService.postHttp(this.ocsServiceConstant.postSoftwareToLicenseMappings, softwareToLicenseMapping, successFn, cbFailureFn);
    }

    getLicenseDetailsForSelectedSoftware(softwareId, successFn, cbFailureFn) {
        this.httpService.getHttp(this.ocsServiceConstant.getLicenseDetailsForSelectedSoftware + softwareId,successFn, cbFailureFn);
    }

    getInstallationDetailsForSelectedSoftware(softwareId, successFn, cbFailureFn) {
        this.httpService.getHttp(this.ocsServiceConstant.getInstallationDetailsForSelectedSoftware + softwareId,successFn, cbFailureFn);
    }

    getSoftwareDashboardData(successFn, cbFailureFn) {
        this.httpService.getHttp(this.ocsServiceConstant.getSoftwareDashboardData,successFn, cbFailureFn);
    }

    getLicenseDetails(licenseId, successFn, cbFailureFn) {
        this.httpService.getHttp(this.ocsServiceConstant.getLicenseDetails + licenseId,successFn, cbFailureFn);
    }

    getExcludedAssetInstalltionDetails(softwareId, successFn, cbFailureFn) {
        this.httpService.getHttp(this.ocsServiceConstant.getExcludedAssetInstalltionDetails + softwareId,successFn, cbFailureFn);
    }
    postExcludeAssetToLicenseMappings(excludedAssets, successFn, cbFailureFn){
        this.httpService.postHttp(this.ocsServiceConstant.postExcludeAssetToLicenseMappings, excludedAssets, successFn, cbFailureFn);
    }

    getAssetExcludeReasonMaster(successFn, cbFailureFn) {
        this.httpService.getHttp(this.ocsServiceConstant.getAssetExcludeReasonMaster,successFn, cbFailureFn);
    }

    postAddNewLicense(licenseDetails, successFn, cbFailureFn){
        this.httpService.postHttp(this.ocsServiceConstant.postAddNewLicense, licenseDetails, successFn, cbFailureFn);
    }

    editSelectedLicense(licenseId, successFn, cbFailureFn) {
        this.httpService.getHttp(this.ocsServiceConstant.editSelectedLicense + licenseId,successFn, cbFailureFn);
    }

    getChildLicensesInfo(licenseId, creationType,successFn, cbFailureFn) {
        this.httpService.getHttp(this.ocsServiceConstant.getChildLicensesInfo + licenseId + '/' + creationType,successFn, cbFailureFn);
    }

    updateLicenseDetails(licenseId,licenseDetails, successFn, cbFailureFn){
        this.httpService.postHttp(this.ocsServiceConstant.updateLicenseDetails + licenseId, licenseDetails, successFn, cbFailureFn);
    }

    getUserHistoryForSelectedCi(assetId,successFn, cbFailureFn) {
        this.httpService.getHttp(this.ocsServiceConstant.getUserHistoryForSelectedCi + assetId,successFn, cbFailureFn);
    }

    postLicenseExportData(queryString,searchParameters,successFn, cbFailureFn) {
        this.httpService.postHttp(this.ocsServiceConstant.postLicenseExportData + queryString, searchParameters,successFn, cbFailureFn);
    }

    importInStockAssets(data,successFn, cbFailureFn) {
        this.httpService.postHttp(this.ocsServiceConstant.importInStockAssets, data,successFn, cbFailureFn);
    }

    bulkUpdateAssets(data,successFn, cbFailureFn) {
        this.httpService.postHttp(this.ocsServiceConstant.bulkUpdateAssets, data,successFn, cbFailureFn);
    }

    userInfo(data,successFn, cbFailureFn) {
        this.httpService.postHttp(this.ocsServiceConstant.userInfo, data,successFn, cbFailureFn);
    }

    vcenterHostDetails(data,successFn, cbFailureFn) {
        this.httpService.getHttp(this.ocsServiceConstant.vcenterHostDetails + data,successFn, cbFailureFn);
    }

    licenseMappingCalculation(licenseId,capacityTypeId, successFn, cbFailureFn) {
        this.httpService.getHttp(this.ocsServiceConstant.licenseMappingCalculation + licenseId + '/' + capacityTypeId,successFn, cbFailureFn);
    }

    getAllRelationshipType(successFn, cbFailureFn) {
        this.httpService.getHttp(this.ocsServiceConstant.getAllRelationshipType,successFn, cbFailureFn);
    }

    getHostDataBasedOnSearch(assetId,relationshipType,searchText,successFn, cbFailureFn) {
        this.httpService.getHttp(this.ocsServiceConstant.getHostDataBasedOnSearch + assetId +'/'+ relationshipType + '/' + searchText,successFn, cbFailureFn);
    }

    postAddNewRelationShip(relationData,successFn, cbFailureFn) {
        this.httpService.postHttp(this.ocsServiceConstant.postAddNewRelationShip, relationData,successFn, cbFailureFn);
    }
}